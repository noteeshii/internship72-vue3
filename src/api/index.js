import axios from "axios";

export async function createCourse(data, cb) {
    axios.post('/s/courses/store', data)
        .then(res => {
            cb(res.data.data)
        });
}

export async function fetchCourses(cb) {
    await axios.get('/s/courses/get', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data);
        });
}

export async function likeStore(likeData) {
    await axios.post('/s/like/store', likeData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function likeDelete(likeData) {
    await axios.post('/s/like/delete', likeData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function currentUserSession(cb) {
    await axios.get('/s/current-user-session', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data);
        })
}

export async function updateUserAvatar(formData, cb) {
    await axios.post('/s/update-user-avatar', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
        .then(response => {
            cb(response.data.data)
        });
}

export async function updateUserData(userData, cb) {
    await axios.post(`/s/update-user-data`, {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        city: userData.city,
    }, {
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            cb(response.data.data)
        });
}

export async function resendEmailVerificationMessage(cb) {
    await axios.post('/s/email/verification-notification', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => cb(response.data))
}

export async function fetchAllForms(cb) {
    await axios.get('/s/forms/get', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data);
        });
}

export async function fetchAllDirections(cb) {
    await axios.get('/s/directions/get', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data)
        });
}

export async function fetchAllMentors(cb) {
    await axios.get('/s/mentors/get', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data)
        });
}

export async function loginUser(loginData, cb, ecb) {
    await axios.post('/s/login', {
        'email': loginData.email,
        'password': loginData.password,
        'remember': loginData.remember
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        cb(response.data.data)
    }).catch(error => {
        ecb(true)
    })
}

export async function registerUser(registerData, cb, ecb) {
    await axios.post('/s/register', {
        'role_id': registerData.role_id,
        'name': registerData.name,
        'surname': registerData.surname,
        'city': registerData.city,
        'email': registerData.email,
        'password': registerData.password,
        'password_confirmation': registerData.password_confirmation
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        cb(response.data.data)
    }).catch(error => {
        ecb(true)
    })
}

export async function fetchUserProfile(cb) {
    await axios.get('/s/session', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data);
        })
}

export async function fetchMentorsQueue(cb) {
    await axios.get('/s/queues/get', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data.data);
        });
}

export async function fetchMentorCreateData(cb) {
    await axios.get('/s/mentors/create', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => cb(response.data.data));
}

export async function createNewCompany(newCompany, cb, ecb) {
    await axios.post('/s/companies/store',
        {
            'name': newCompany
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            cb(response.data)
        }).catch(e => {
                ecb(newCompany);
            }
        )
}

export async function createMentorCard(mentorCardData, cb, ecb) {
    await axios.post('/s/mentors/store', {
        'user_id': mentorCardData.user_id,
        'direction_id': mentorCardData.direction_id,
        'company_id': mentorCardData.company_id,
        'form_id': mentorCardData.form_id,
        'info': mentorCardData.info,
        'group_size': mentorCardData.group_size,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            cb(response.data)
        }).catch(e => {
                ecb(e);
            }
        )
}

