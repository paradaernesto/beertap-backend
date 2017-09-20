const bcrypt = require('bcryptjs');

console.log(bcrypt.compareSync("password", "$2a$10$Ual3R9uCwqJPUSZ5wEEQ7eTFmCYwq9WR9DMmc8iLpmuT9Ue3Tpl62"))
