// auth.js - gerencia cadastro, login e perfil via localStorage
(function(){
    const USERS_KEY = 'meuapp_users_v1';
    const CURRENT_KEY = 'meuapp_current_user_v1';

    function getUsers(){
        try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
        catch(e){ return []; }
    }
    function saveUsers(users){
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function setCurrentUser(email){
        localStorage.setItem(CURRENT_KEY, email);
    }
    function getCurrentUser(){
        return localStorage.getItem(CURRENT_KEY);
    }
    function clearCurrentUser(){
        localStorage.removeItem(CURRENT_KEY);
    }

    window.handleRegister = function handleRegister(e){
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm-password').value;
        const bio = document.getElementById('bio').value.trim();
        const avatar = document.getElementById('avatar').value.trim();

        if(password !== confirm){ alert('As senhas não coincidem'); return; }
        const users = getUsers();
        if(users.find(u => u.email === email)){ alert('Já existe uma conta com esse e-mail'); return; }
        if(users.find(u => u.username === username)){ alert('Nome de usuário indisponível'); return; }

        const user = {
            id: Date.now(),
            name, username, email, password,
            bio: bio || '',
            avatar: avatar || '',
            createdAt: new Date().toISOString()
        };
        users.push(user);
        saveUsers(users);
        setCurrentUser(user.email);
        // redireciona para perfil
        window.location.href = '/Html/perfil.html';
    };

    window.handleLogin = function handleLogin(e){
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const users = getUsers();
        const user = users.find(u => u.email === email);
        if(!user){ alert('Conta não encontrada'); return; }
        if(user.password !== password){ alert('Senha incorreta'); return; }
        setCurrentUser(user.email);
        window.location.href = '/Html/perfil.html';
    };

    window.loadProfile = function loadProfile(){
        const email = getCurrentUser();
        if(!email){ window.location.href = '/Html/login.html'; return; }
        const users = getUsers();
        const user = users.find(u => u.email === email);
        if(!user){ clearCurrentUser(); window.location.href = '/Html/login.html'; return; }

        const avatarImg = document.getElementById('profile-avatar-img');
        const nameEl = document.getElementById('profile-name');
        const usernameEl = document.getElementById('profile-username');
        const emailEl = document.getElementById('profile-email');
        const joinEl = document.getElementById('profile-join-date');

        if(avatarImg && user.avatar){ avatarImg.src = user.avatar; }
        if(nameEl) nameEl.textContent = user.name || user.username;
        if(usernameEl) usernameEl.textContent = '@' + (user.username || '');
        if(emailEl) emailEl.textContent = user.email;
        if(joinEl) joinEl.textContent = 'Membro desde ' + new Date(user.createdAt).toLocaleDateString();

        // preencher informações adicionais
        const infoName = document.getElementById('info-name'); if(infoName) infoName.textContent = user.name || '—';
        const infoEmail = document.getElementById('info-email'); if(infoEmail) infoEmail.textContent = user.email || '—';
        const infoDob = document.getElementById('info-dob'); if(infoDob) infoDob.textContent = user.dob || '—';
        const infoPhone = document.getElementById('info-phone'); if(infoPhone) infoPhone.textContent = user.phone || '—';
    };

    window.logout = function logout(){
        clearCurrentUser();
        window.location.href = '/Html/login.html';
    };

    window.deleteAccount = function deleteAccount(){
        if(!confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) return;
        const email = getCurrentUser();
        if(!email) return;
        let users = getUsers();
        users = users.filter(u => u.email !== email);
        saveUsers(users);
        clearCurrentUser();
        window.location.href = '/Html/index.html';
    };

})();
