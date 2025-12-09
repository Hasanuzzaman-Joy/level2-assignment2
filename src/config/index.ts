import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), ".env"),
})

const config = {
    Port : process.env.PORT || 3000,
    DB_URL : process.env.DB_URL,
    Jwt_secret : process.env.JWT_SECRET
}

export default config;