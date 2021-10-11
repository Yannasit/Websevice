const add = async () => {   
    //เก็บค่าจาก input
    const Firstname = document.getElementById("Firstname").value;
    const Lastname = document.getElementById("Lastname").value;
    const PhoneMunber = document.getElementById("PhoneMunber").value;
    const Address = document.getElementById("Address").value;
    const Email = document.getElementById("Email").value;
    const imageurl = document.getElementById("imageurl").value;
    
  
    if ( Firstname && Lastname && PhoneMunber && Address && Email && imageurl) { //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
        const params = { //set พารามิเตอร์
            Firstname: Firstname,
            Lastname: Lastname,
            PhoneMunber: PhoneMunber,
            Address: Address,
            Email: Email,
            imageurl: imageurl,
        };
      try {
        const Users = await fetch( //ส่งไปยัง server
          "http://localhost:5000/apis/users",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params), // เพิ่ม data
          }
        ).then((response) => {
          return response.json(); //คอนเวิดให้อยู่ในรูปแบบ json
        }).then(()=>{
          alert(`user: ${Firstname} is added`);
        });
      } catch (error) {
        alert(`add new user`);
      }
    } else {
      alertalert("All fields are required!!");
    }
  };