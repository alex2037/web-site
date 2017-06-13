# web-site

Web интерфейс для визуализации сервисоной арихитектуры

Используется следующее Api:
### Закрытие сессии пользователя

    GET /auth/close
    
Params:
1. profileId - id пользователя

Запрос

    {
        profileId: int
    }
Ответ
    
    {
    }

### Открытие сессии пользователя

    POST /auth/search
    
Params:
1. login - login пользователя
2. password - password пользователя

Запрос

    {
        login: text,
        password: text
    }
Ответ

    {
        token: text
    }

### Регистрация пользователя

    POST /auth/registration
    
Params:
1. login - login пользователя
2. email - email пользователя
3. password - password пользователя

Запрос

    {
        login: text,
        email: text,
        password: text
    }
Ответ
    
    {
    }

### Получение пользователей

    POST /peoples/search
    
Params:
1. name - имя пользователя для поиска (опционально)
2. isFriends - флаг для поиска среди друзей (опционально)
3. limit - кол-во пользователей на получение
4. offset - начальный индекс последовательности (искать с 5 например)

Запрос

    {
        name: text,
        isFriends: boolean,
        limit: int
        offset: int
    }
Ответ

    {
        total: int, (Общее кол-во друзей/пользователей)
        items: Array {name: text, suname: text, id: int, isFriend: boolean} (массив пользователей)
    }

### Добавление пользователеля в друзья

    GET /peoples/added
    
Params:
1. profileId - id пользователя которому добавляются
2. userId - id пользователя на добавление

Запрос

    {
        profileId: int,
        userId: int
    }
Ответ

    {
    }

### Удаление пользователеля из друзей

    GET /peoples/remove
    
Params:
1. profileId - id пользователя которому добавляются
2. userId - id пользователя на добавление

Запрос

    {
        profileId: int,
        userId: int
    }
Ответ

    {
    }

### Получение постов

    POST /posts/search
    
Params:
1. profileId - id пользователя
2. limit - кол-во постов на получение
3. offset - начальный индекс последовательности (искать с 5 например)

Запрос

    {
        profileId: int,
        limit: int
        offset: int
    }
Ответ

    {
        total: int, (Общее кол-во постов)
        items: Array {text: text, isLike: boolean, isDislike: boolean, id: int} (массив постов)
    }

### Создание поста

    POST /post
    
Params:
1. profileId - id пользователя
2. text - пост

Запрос

    {
        profileId: int,
        text: text
    }
Ответ

    {
    }

### Запрос на лайк

    GET /posts/like
    
Params:
1. postId - id поста
2. isActive - флаг на высталение лайка

Запрос

    {
        postId: int,
        isActive: boolean
    }
Ответ (сам пост с выставленным флагом)

    {
        text: text,
        isLike: boolean,
        isDislike: boolean,
        id: int
    }

### Запрос на дизлайк

    GET /posts/dislike
    
Params:
1. postId - id поста
2. isActive - флаг на высталение лайка

Запрос

    {
        postId: int,
        isActive: boolean
    }
Ответ (сам пост с выставленным флагом)

    {
        text: text,
        isLike: boolean,
        isDislike: boolean,
        id: int
    }

### Получение профиля пользователя

    GET /profile
    
Params:
1. profileId - id пользователя

Запрос

    {
        profileId: int,
    }
Ответ

    {
        login: text,
        password: text,
        name: text,
        suname: text,
        email: text,
        interests: Array [{text: text, id: int}] (Массив интересов)
    }

### Редактирование профиля пользователя

    POST /profile
    
Params:
1. profileId - id пользователя
2. profile - объект с полями пользователя

Запрос

    {
        profileId: int,
        profile: 
        {
            login: text,
            password: text,
            name: text,
            suname: text,
            email: text,
            interests: Array {text: text, id: int} (Массив интересов)
        }
    }
Ответ

    {
    }

### Получение интересов

    POST /interests/search
    
Params:
1. profileId - id пользователя

Запрос

    {
        profileId: int
    }
Ответ

    {
        total: int, (Общее кол-во постов)
        items: Array {text: text, id: int} (Массив интересов)
    }