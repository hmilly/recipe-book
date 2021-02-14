import React, { useState, useEffect } from 'react'

function OrderPage({ burger }) {

    const [basketsContents, setBasketsContents] = useState([])

    useEffect(() => {
        setBasketsContents((basketsContents) => {
            setBasketsContents({ ...basketsContents, burger })
            console.log(basketsContents) 
        })
    }, [basketsContents, burger])



    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            await fetch('db.json')
                .then(res => res.json())
                .then(res => setUsers(res.users))
                .catch((error) => console.log(error));
        }
        getUsers()
    }, [])

    const [userDetails, setUserDetails] = useState({
        "id": users.length + 1,
        "title": "",
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "phonenumber": 0,
        "postcode": ""
    })

    const handleChange = (e) => {
        const name = e.target.name
        const v = name !== "phonenumber" ? e.target.value : parseInt(e.target.value)
        setUserDetails({ ...userDetails, [name]: v })
        console.log(userDetails)
    }

    const newUser = async () => {
        const configObject = await {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                ...userDetails
            }),
        };
        await fetch('db.json', configObject)
            .then((res) => (res.ok ? res.json() : "Oops we couldn't update that!"))
            .catch((error) => console.log(error));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        //users.push(userDetails) 
        users.map(u => u.email.toLowerCase() === userDetails.email.toLowerCase()
            ? window.alert("Email entered is currently in use, please re-enter and try again")
            : newUser()
        )
    }

    return (

        <div className="order_page">
            <div className="order_page_form">
                <form>
                    <p>Your details:</p>
                    <select name="title" placeholder="Title" onChange={(e) => handleChange(e)} >
                        <option value="Mr" >Select:</option>
                        <option value="Mr" >Mr</option>
                        <option value="Mrs" >Mrs</option>
                        <option value="Ms" >Ms</option>
                        <option value="Mx" >Mx</option>
                    </select>
                    <div>
                        <input type="text" name="firstname" placeholder="First name*"
                            onChange={(e) => handleChange(e)} />
                        <input type="text" name="lastname" placeholder="Last name*"
                            onChange={(e) => handleChange(e)} />
                    </div>
                    <input type="text" name="email" placeholder="Email address*"
                        onChange={(e) => handleChange(e)} />
                    <input type="password" name="password" placeholder="Password*" minLength="8" required
                        onChange={(e) => handleChange(e)} />
                    <p>Contact number:</p>
                    <input type="number" name="phonenumber" placeholder="Phone number*"
                        onChange={(e) => handleChange(e)} />
                    <p>Delivery address:</p>
                    <input className="postcode" name="postcode" placeholder="Postcode*" type="text"
                        onChange={(e) => handleChange(e)} />
                    <button type="submit" value="submit" onClick={(e) => handleSubmit(e)}>SUBMIT</button>
                </form>
            </div>

            <div className="order_page_receipt">
                <div className="receipt_buy">
                    <img src={`${process.env.PUBLIC_URL}/assets/buy.png`} alt="cart" />
                    <button> basket</button>
                </div>
                <div className="receipt_main">
                    <div className="receipt_main_img">
                        <img src={`${process.env.PUBLIC_URL}/assets/main3.png`} alt="burger" />
                    </div>
                    <div className="receipt_main_info">
                        <div>
                            <h4>2 servings</h4>
                            <h4>2 burgers</h4>
                        </div>
                        <p>Ground beef, Potato Buns, Broccoli, Garlic,
                        Baby Bok Choy, Hoisin Sauce, Sweet White Miso
                        Paste, Mayonnaise, White Wine Vinegar, Black
                        & White Sesame Seeds
                        </p>
                        <select name="quantity">
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                        </select>
                        <h3>£15</h3>
                    </div>
                </div>
                <div className="receipt_delivery">
                    <h3>Delivery Fee:</h3>
                    <h3>£3</h3>
                </div>
                <div className="receipt_total">
                    <h3>Total Price:</h3>
                    <h3>£18</h3>
                </div>
            </div>
        </div>
    )
}


export default OrderPage