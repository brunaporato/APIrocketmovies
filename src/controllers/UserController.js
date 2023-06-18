const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const hashedPassword = await hash(password, 8);

    const [user_id] = await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json();
  }

  async update(request, response) {
    let {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where("id", user_id)
    
    if(!user) {
      throw new AppError("User not found.");
    }

    const userWithUpdatedEmail = await knex("users").where("email", email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("This email is already in use");
    }

    if(!name) {
      name = user[0].name
    }
    
    if(!email) {
      email = user[0].email
    }

    if(password && !old_password) {
      throw new AppError("You need to enter the old password");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user[0].password);

      if(!checkOldPassword) {
        throw new AppError("Wrong old password");
      }

      password = await hash(password, 8)
    }

    if(!password) {
      password = user[0].password
    }

    await knex("users")
    .where("id", user_id)
    .update({
      name,
      email,
      password
    })

    return response.json();
  }
}

module.exports = UserController;