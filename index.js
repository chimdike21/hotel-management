const roomPrices ={
    single: 15000,
    double: 30000,
    suite: 70000
}

const users = {
    admin: "password123",  //for admin only
    customer1: "customerpass1"
}

//admin access
const isAdmin = (username) => username === "admin"

//login
document.getElementById("loginForm").addEventListener("submit", (event)=>
{
    event.preventDefault()

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username]=== password){
        alert("Login successful!");
        document.getElementById("login").style.display ="none"

        if (isAdmin(username)){
            document.getElementById("admin-dash").style.display="block"
        } else{
            document.getElementById("booking").style.display="block"
            document.getElementById("payment").style.display="block"
        }
    } else{
        alert("invalid username or password!")
    }
})

//bookings
document.getElementById("booking-form").addEventListener("submit", (event)=>
    {
        event.preventDefault()
        const name= document.getElementById("name").value;
        const roomType= document.getElementById("room-type").value;
        const nights= parseInt(document.getElementById("nights").value, 10)
        const cost= roomPrices[roomType] * nights
        //document.getElementById("cost").innerHTML = `Total cost: ${cost}`
        const booking= {name, roomType, nights, cost}
        let bookings= JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(booking)
        localStorage.setItem("bookings", JSON.stringify(bookings))

        alert("Booking successful! Please proceed to payment.")
        document.getElementById("booking-form").reset()
    })

    //payment
    document.getElementById("payment-form").addEventListener("submit", (event)=>
    {
        event.preventDefault()
        alert("Payment successful! Thank You for booking.")
        document.getElementById("payment-form").reset()
    })

    //admin
    document.getElementById("viewBookings").addEventListener("click", ()=>
    {
        const bookings= JSON.parse(localStorage.getItem("bookings")) || []
        const bookingList= document.getElementById("bookingList").bookingList.innerHTML=""

        bookings.forEach((booking, index)=>
        {
            const listItem=document.createElement("li");
            listItem.innerHTML=`
            <strong>${index + 1}.${booking.name}</strong> - ${booking.roomType} for ${booking.nights}
            nights. Total:$${booking.cost}`
            bookingList.appendChild(listItem)
        })
    })