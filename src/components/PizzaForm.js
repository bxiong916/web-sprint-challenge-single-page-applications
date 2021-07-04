import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../Images/pizzabackground.jpg";
import "../App.css";
import * as yup from "yup";
import Orders from "../components/Orders"
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required('Please enter a valid name').min(2, 'That\'s not a valid input'),
    phone: yup.string().required('Please enter a valid phone number').matches(/^[0-9]{10}$/, "Please enter a valid phone number")
})

const PizzaDiv = styled.div`
  width: auto;
  background: red;
  color: black;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 10px;
  overflow: hidden;
`;

const PizzaForm = props => {
    console.log("props", props)
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    type: {
      Pepperoni: false,
      olives: false,
      ham: false,
      mushrooms: false,
    },
    bread: {
      wheat: false,
      italian: false,
      sourdough: false,
      white: false,
     
    },
    additions: {
      light: false,
      normal: false,
      extra: false,
      double: false,
    },
    instructions: "",
  });

  const [errors, setErrors] = useState({
      name: '',
      phone: ''
  });

  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
    schema.isValid(formState).then(valid => setIsDisabled(!valid)); // eslint-disable-next-line 
}, [formState, schema]) 

  const validate = e => {
      e.persist();
      yup.reach(schema, e.target.name).validate(e.target.value)
      .then(valid => setErrors({...errors, [e.target.name]: ''}))
      .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}))
  }

  const handleChanges = (e) => {
    if (e.target.type === 'checkbox') { 
        setFormState({ ...formState, additions: {
            ...formState.additions, [e.target.value]: e.target.checked }});
  
    } else {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    } if (e.target.name === 'name' || e.target.name === "phone") {
            validate(e)
    }} ;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
    .then(res => props.addOrder(res.data))
    .catch(err => console.log(err));

  };

  const handleEdit = (e) => {
      e.preventDefault();
      props.saveOrder(formState);
      setFormState({
        name: "",
        phone: "",
        type: {
            small: false,
            medium: false,
            large: false,
            mushrooms: false,
        },
        // bread: {
        //     wheat: false,
        //     italian: false,
        //     sourdough: false,
        //     white: false,
           
        //   },
          toppings: {
            Pepperoni: false,
            olives: false,
            ham: false,
            mushrooms: false,
          },
        instructions: "",
      })
  }
  return (
    <div>
      <PizzaDiv>
        <h1>Customize your Order</h1>
        <form
          onSubmit={(e) => {
            if (props.orderToEdit) handleEdit(e); else handleSubmit(e)}}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>
            {" "}
            Name:
            <input
              name="name"
              value={formState.name}
              placeholder="Enter Name..."
              onChange={handleChanges}
              data-cy="name"
            />
            {errors.name.length > 0 && <p style={{color:"red"}}>{errors.name}</p>}
          </label>
          <label>
            {" "}
            Phone Number:
            <input
              name="phone"
              value={formState.phone}
              placeholder="Enter Phone number..."
              onChange={handleChanges}
              data-cy="phone"
            />
             {errors.phone.length > 0 && <p style={{color:"red"}}>{errors.phone}</p>}
            <br></br>
            size of pizza:
            <select
              name="type"
              data-cy="type"
              defaultValue="small"
              onChange={handleChanges}
            >
              <option data-cy="small" value="small">small</option>
              <option data-cy="medium" value="medium">medium</option>
              <option data-cy="large" value="large">large</option>
              <option data-cy="x-large" value="x-large">x-large</option>
              
            </select>
          </label>
          {/* <label>
            {" "}
            Temperature:
            <select name="temp" data-cy="temp" defaultValue="hot" value={formState.temp} onChange={handleChanges}>
              <option data-cy="hot" value="hot">Hot</option>
              <option data-cy="iced" value="iced">Iced</option>
            </select>
          </label> */}
          {/* <label>
            {" "}
            Choice of Bread:
            <select name="Bread" data-cy="bread" defaultValue="none" value={formState.bread} onChange={handleChanges}>
              <option data-cy="wheat" value="wheat">Wheat</option>
              <option data-cy="italian" value="italian">Italian</option>
              <option data-cy="sourdough" value="sourdough">Sourdough</option>
              <option data-cy="white" value="white">White</option>
            </select>
          </label> */}
          <fieldset style={{border:"none"}}>
            <label>Toppings: </label> <br />
            <label>
              {" "}
              <input type="checkbox" data-cy="pepperoni" name="pepperoni" onChange={handleChanges} value="pepperoni" />
              pepperoni
            </label>
            <label>
              {" "}
              <input type="checkbox" data-cy="olives" name="olives" onChange={handleChanges} value="olives"/>
              olives
            </label>
            <br/>
            <label>
              {" "}
              <input type="checkbox" data-cy="ham" name="ham" onChange={handleChanges} value="ham"/>
              ham
            </label>
            <label>
              {" "}
              <input type="checkbox" data-cy="mushrooms" name="mushrooms" onChange={handleChanges} value="mushrooms"/>
              mushrooms
            </label>
          </fieldset>

          <label>
            {" "}
            Special Instructions <br />
            <textarea placeholder="Start Typing..." name="instructions" data-cy="instructions" onChange={handleChanges} value={formState.instructions}/>
          </label>

          <button
            style={{
              background: "black",
              color: "white",
              borderRadius: "8px",
              width: "150px",
              height: "40px",
              fontSize: "1.2rem",
              border: "none",
              marginTop: "2%"
            }}
            type="submit"
            disabled={isDisabled}
            className="order-button"
            data-cy="submit"
          >
            Order Now
          </button>
        </form>
        <div style={{background: "white", color: "black"}}>
        {props.orders.map((order, i) => <Orders key={i} order={order} cancelOrder={props.cancelOrder} editOrder={props.editOrder} />)}
        </div>
      </PizzaDiv>
      
      <img
        src={img}
        alt="pizza"
        style={{
          postion: "absolute",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      />

    </div>
  );
};

export default PizzaForm;

