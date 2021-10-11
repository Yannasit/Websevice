const sql = require("./db");
//constructor
const User = function (user) {  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้
    //Attributes
    this.id = user.id;
    this.Firstname = user.Firstname;
    this.Lastname = user.Lastname;
    this.PhoneMunber = user.PhoneMunber;
    this.Email = user.Email;
    this.Address = user.Address;
    this.imageurl = user.imageurl;
};

//Insert Data User
User.create = (newUser, result) => {
    //INSERT INTO user SET id  , Firstname , Lastname  ,.... Values ("1","Yannasit","Santiekachun","url")
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created restaurant:", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    })
};

//Get User byId
User.getById = (id, result) => {
    //SELECT * FROM users where id = id
    sql.query(`SELECT * FROM user WHERE id  = ${id}`,
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }
            if (res.length) { //ถ้าหากเจอข้อมูล
                result(null, res[0]); //ส่งข้อมูล array ตำแหน่งที่ 1 กลับมา
                return;
            }
            //restaurant not found  with this Id
            result({ kind: "not_found" }, null);
        }
    );
};

//Get All User restaurantrant
User.get = (result) => {
    //SELECT * FROM user
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
            console.log("error ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

//Update user Data
User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET Firstname = ? ,Lastname = ? , PhoneMunber = ? , Email = ? , Address = ? , imageurl = ? WHERE id  = ?",
        [user.Firstname, user.Lastname, user.PhoneMunber, user.Email, user.Address, user.imageurl, id], // อัพเดพข้อมูลตามฐารข้อมูล
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) { //เช็คแถวที่อัพเดท
                result({ kind: "not_found" }, null)
                return;
            }
            //Restaurant data is updated
            result(null, { id: id, ...user });
        }
    );
};

//Delete user by Id
User.removeById = (id, result) => {
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) { //เช็คแถวที่อัพเดท
            result({ kind: "not_found" }, null)
            return;
        }

        console.log("Delete restaurant with id : ", id);
        result(null, res);

    });
};

module.exports = User;