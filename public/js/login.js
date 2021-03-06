async function loginFormHandler(event) {
    event.preventDefault()

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
    const loginFail = document.querySelector('.loginFail')

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            loginFail.innerHTML = 'Incorrect email or password'
        }
    } else {
        loginFail.innerHTML = 'Please enter an email and password'
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)