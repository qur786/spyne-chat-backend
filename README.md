# Spyne Backend

```mermaid
graph TD

    User -->|Makes Requests| API[API Gateway]

    API -->|Forwards to| Auth[Auth Service]
    API -->|Forwards to| UserSvc[User Service]
    API -->|Forwards to| Discussion[Discussion Service]

    subgraph Auth Service
        Auth1[POST /auth/signup]
        Auth2[POST /auth/login]
        Auth3[POST /auth/logout]
        Auth4[GET /auth/check]
        Auth --> Auth1
        Auth --> Auth2
        Auth --> Auth3
        Auth --> Auth4
    end

    subgraph User Service
        User1[POST /users]
        User2[PATCH /users/:id]
        User3[DELETE /users/:id]
        User4[GET /users]
        User5[GET /users/search]
        User6[POST /users/follow/:id]
        UserSvc --> User1
        UserSvc --> User2
        UserSvc --> User3
        UserSvc --> User4
        UserSvc --> User5
        UserSvc --> User6
    end

    subgraph Discussion Service
        Discussion1[POST /discussions]
        Discussion2[PATCH /discussions/:id]
        Discussion3[DELETE /discussions/:id]
        Discussion4[GET /discussions/tags]
        Discussion5[GET /discussions/search]
        Discussion6[POST /discussions/:id/like]
        Discussion7[POST /discussions/:id/comments]
        Discussion8[POST /comments/:commentId/replies]
        Discussion9[DELETE /comments/:commentId]
        Discussion10[PATCH /comments/:commentId]
        Discussion11[POST /discussions/:id/view]
        Discussion12[GET /discussions/:id/viewCount]
        Discussion13[POST /comments/:commentId/like]
        Discussion --> Discussion1
        Discussion --> Discussion2
        Discussion --> Discussion3
        Discussion --> Discussion4
        Discussion --> Discussion5
        Discussion --> Discussion6
        Discussion --> Discussion7
        Discussion --> Discussion8
        Discussion --> Discussion9
        Discussion --> Discussion10
        Discussion --> Discussion11
        Discussion --> Discussion12
        Discussion --> Discussion13
    end

```
