# README

---

## Contents

### App

> chat space

### Tecknology

- Ruby
- Rails
- Javascript
- HTML/HAML
- CSS/SCSS
- Git
- MySQL
- AWS

---

## DB 設計

### users Table

| Column   | Type   | Options                   |
| -------- | ------ | ------------------------- |
| name     | string | null: false, index: true  |
| email    | string | null: false, unique: true |
| password | string | null: false               |

##### Association

- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

### group_users Table

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

##### Association

- belongs_to :user
- belongs_to :group

### groups Table

| Column | Type   | Options                  |
| ------ | ------ | ------------------------ |
| name   | string | null: false, index: true |

##### Association

- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages

### messages Table

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| content  | text    |                                |
| image    | string  |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :group
