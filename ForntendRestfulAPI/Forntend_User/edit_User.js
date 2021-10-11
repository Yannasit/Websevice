const init = async () =>{
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  if(id){
      try{
          const user = await fetch(
              "http://localhost:5000/apis/users/" + id,{ //ต่อไอดีที่ส่งมาจากการกำปุ่ม Edit
              method: "GET",          
              mode:"cors",
              cache:"no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
              credentals:"same-origin",
              headers:{
                  "Content-type":"application/json"  //ข้อมุลอยู่ในรูปแบบ json
              },
          }).then((response)=>{
              return response.json();  //ส่งค่าในรูปแบบ json
          });
          //set input value 19-22
          document.getElementById("id").value = user.id;
          document.getElementById("Firstname").value = user.Firstname;
          document.getElementById("Lastname").value = user.Lastname;
          document.getElementById("PhoneMunber").value = user.PhoneMunber;
          document.getElementById("Address").value = user.Address;
          document.getElementById("Email").value = user.Email;
          document.getElementById("imageurl").value = user.imageurl;
      }catch (error){
          alert(`User id: ${id} not found`)
      }
  }else{
      alert("User ID is missing");
  }
};

const edit = async () => {
  const id = document.getElementById("id").value;
  if (id) {
      const params = {
          id: document.getElementById("id").value,
          Firstname: document.getElementById("Firstname").value,
          Lastname: document.getElementById("Lastname").value,
          PhoneMunber: document.getElementById("PhoneMunber").value,
          Address: document.getElementById("Address").value,
          Email: document.getElementById("Email").value,
          imageurl: document.getElementById("imageurl").value,
      };
    try {
      const user = await fetch(
        "http://localhost:5000/apis/users/" + id,
        {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params), // เพิ่ม data
        }
      ).then((response) => {
        return response.json();
      }).then(()=>{
        alert(`user id:${id} is update`);
      });
    } catch (error) {
      alert(`user id:${id} not found`);
    }
  } else {
    alertalert("user ID is missing");
  }
};