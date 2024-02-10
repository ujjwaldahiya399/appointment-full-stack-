
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', appointmentDetails);

function appointmentDetails(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;
    const message = event.target.elements.message.value
    const appointmentData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };
    console.log(appointmentData);

    axios.post('http://localhost:3000/add-user', appointmentData)
    .then((res) => {
        renderAppointments();
    })
    .catch((err) => {
        console.log(err);
    });
}

function fetchAppointments() {
   return axios.get('http://localhost:3000/get-user')
        .then(response => {
            console.log(response.data);
            return response.data.allUsers;
        })
        .catch(error => {
            console.error('Error fetching appointments:', error.message);
            throw error;
        });
}

function renderAppointments() {
    const tbody = document.querySelector('tbody');

    fetchAppointments()
        .then(usersData => {
            tbody.innerHTML = '';

            usersData.forEach(appointment => {
                const tr = document.createElement('tr');
                tr.classList.add('border-b', 'transition-colors', 'hover:bg-muted/50', 'data-[state=selected]:bg-muted');

                const tdName = document.createElement('td');
                tdName.classList.add('p-4', 'align-middle', 'font-medium');
                tdName.textContent = appointment.name;

                const tdEmail = document.createElement('td');
                tdEmail.classList.add('p-4', 'align-middle');
                tdEmail.textContent = appointment.email;

                const tdPhone = document.createElement('td');
                tdPhone.classList.add('p-4', 'align-middle');
                tdPhone.textContent = appointment.phone;

                const tdActions = document.createElement('td');
                tdActions.classList.add('p-4', 'align-middle', 'flex', 'gap-2');

                const editBtn = document.createElement('button');
                editBtn.type = 'button';
                editBtn.classList.add('inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap', 'rounded-md', 'text-sm', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground', 'w-8', 'h-8');
                editBtn.innerHTML = `<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-4 h-4"
                                    >
                                        <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                                    </svg>`;
                editBtn.addEventListener('click', () => {
                    handleEditAppointment(appointment.id); 
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.classList.add('inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap', 'rounded-md', 'text-sm', 'font-medium', 'ring-offset-background', 'transition-colors', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50', 'border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground', 'w-8', 'h-8');
                deleteBtn.innerHTML = `<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-4 h-4"
                                    >
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>`;
                deleteBtn.addEventListener('click', () => {
                    handleDeleteAppointment(appointment.id); 
                });

                tdActions.appendChild(editBtn);
                tdActions.appendChild(deleteBtn);

                tr.appendChild(tdName);
                tr.appendChild(tdEmail);
                tr.appendChild(tdPhone);
                tr.appendChild(tdActions);

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function handleEditAppointment(appointmentId) {
    console.log('Edit appointment with ID:', appointmentId);
}

function handleDeleteAppointment(appointmentId) {
    console.log('Delete appointment with ID:', appointmentId);
}

renderAppointments();
