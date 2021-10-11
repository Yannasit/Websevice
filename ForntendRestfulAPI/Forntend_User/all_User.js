const init = async()=>{
    const allUsers = await fetch(
        "http://localhost:5000/apis/users",{
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
    }).then((response)=> response.json());
    allUsers.forEach((element) => addUsers(element));
}

const addUsers = (element) =>{
    const item = document.createElement("div"); //สร้าง div
    item.className = "card"; //กำหนดชื่อ class
    item.style ="width: 20rem;" //กำหนด style
    //6-14 เป็นการกำหนด HTML มีการแทรก ข้อมูลลงไปด้วย
    const card =`    
    <img src="${element.imageurl}" class="card-img-top" alt="${element.Firstname}">
    <div class="card-body">
      <h6 class="card-title">ชื่อ-นามสกุล : ${element.Firstname}  ${element.Lastname}</h6>
      <p class="card-text">เบอร์โทร : ${element.PhoneMunber}</p>
      <p class="card-text">อีเมล์ : ${element.Email}</p>
      <a href="#" class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</a>
      <a href="edit_User.html?id=${element.id}" class="btn btn-warning">Edit</a>
    </div>
    `;
    item.innerHTML = card;  //เอาไปแทรกที่card ลงใน div
    const userElement = document.querySelector(".users"); //เข้าถึง class หน้า HTML
    userElement.appendChild(item); //เพิ่มลงไป
}

const removeAllResult = () =>{
    const usersElement = document.querySelector(".users");
    usersElement.innerHTML = "";
}

const deleteUser = async (id) =>{ //รับไอดีที่ส่งมา
    if(id){ //เช็ค id
        try{
            const user = await fetch(
                "http://localhost:5000/apis/users/" + id,{ //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //DELETE
                mode:"cors",
                cache:"no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals:"same-origin",
                headers:{
                    "Content-type":"application/json"  //ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response)=>{
                return response.json();  //ส่งค่าในรูปแบบ json
            }).then(()=>{
                alert (`user id: ${id} is Delete`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        }catch(error){
            alert(`user id:${id} not found!!`);
        }
    }else{
        alert("user ID is missing") 
    }
}