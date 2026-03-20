import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const dispatch = useDispatch();
  const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;


  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  const handleAddToCart = (index) => {
    if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  {/* These dispatches seem the most React-Redux part of the code, so let's see if I have this right.
      Rather than handle the state changes directly in the component, I'm using Redux store to manage state.
      It's more code and complexity than makes sense for this little app if I were doing it for real, rather than as an exercise.
      But as we scale up into larger apps, it makes more sense as it means we manage state in a central place and can share it across components more easliy.
      I can also see how it would lead to nicer separation of concerns, to keep state management separate from the UI code.  
      
      Anyway, back to the code:
      These handler functions are linked to the onClick events of the buttons in the return statement for the ConferenceEvent component. 
      When a button is clicked, the corresponding handler function is called with the index of the item being modified.

      dispatch is a function provided by the useDispatch hook from React-Redux. It allows us to send actions to the Redux store to update the state.

      decrementQuantity is an action creator imported from the venueSlice. When called with an index, it returns an action object that describes
      the change we want to make to the state (in this case, decrementing the quantity of a specific venue item).
      
      When we call dispatch(decrementQuantity(index)), we're sending that action to the Redux store.

      The store will then use the reducer function defined in venueSlice to determine how to update the state based on the action received.
      */}
    


  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };
  const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {  
        dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {

  };

  const getItemsFromTotalCost = () => {
    const items = [];
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
  };
 
 const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    }
    return totalCost;
  };

  const avTotalCost = calculateTotalCost("av");
  const venueTotalCost = calculateTotalCost("venue");

  const navigateToProducts = (idType) => {
    if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
      if (showItems) { // Check if showItems is false
        setShowItems(!showItems); // Toggle showItems to true only if it's currently false
      }
    }
  }

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
            <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
            <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
          </div>
          <button className="details_button" onClick={() => setShowItems(!showItems)}>
            Show Details
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems
          ?
          (
            <div className="items-information">
              <div id="venue" className="venue_container container_main">
                <div className="text">

                  <h1>Venue Room Selection</h1>
                </div>
                <div className="venue_selection">
                  {venueItems.map((item, index) => (
                    <div className="venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text">{item.name}</div>
                      <div>${item.cost}</div>
                      <div className="button_container">
                        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

                          <>
                            <button
                              className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                              onClick={() => handleRemoveFromCart(index)}
                            >
                              &#8211;
                            </button>
                            <span className="selected_count">
                              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                            </span>
                            <button
                              className={remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                              onClick={() => handleAddToCart(index)}
                            >
                              &#43;
                            </button>
                          </>
                        ) : (
                          <div className="button_container">
                            <button
                              className={venueItems[index].quantity === 0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
                              onClick={() => handleRemoveFromCart(index)}
                            >
                              &#8211;
                            </button>
                            <span className="selected_count">
                              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                            </span>
                            <button
                              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
                              onClick={() => handleAddToCart(index)}
                            >
                              &#43;
                            </button>


                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total_cost">Total Cost: ${venueTotalCost}</div>
              </div>

              {/*Necessary Add-ons*/}
              <div id="addons" className="venue_container container_main">


                <div className="text">

                  <h1> Add-ons Selection</h1>

                </div>
                <div className="addons_selection">
                  {/* Below is a common React pattern. .map() iterates through the avItems array, each time calling
                      the function, which returns JSX for React to render.
                      item is the current array element and index its position in the array.
                      I'm using the index as the key for each element, but that is only recommended for static lists.
                      The course recommends I use a unique identifier as part of the element (e.g., item.id) when
                      list order can change. In Rect terms, React likes the items it renders to have a stable key prop.*/}
                  {avItems.map((item, index) => (
                    <div className="av_data venue_main" key={index}>
                      <div className="img">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="text"> {item.name} </div>
                      <div> ${item.cost} </div>
                      <div className="addons_btn">
                        <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className=" btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                      </div>
                    </div>
                  ))}

                </div>
                <div className="total_cost">Total Cost: {avTotalCost}</div>

              </div>

              {/* Meal Section */}

              <div id="meals" className="venue_container container_main">

                <div className="text">

                  <h1>Meals Selection</h1>
                </div>

                <div className="input-container venue_selection">

                </div>
                <div className="meal_selection">

                </div>
                <div className="total_cost">Total Cost: </div>


              </div>
            </div>
          ) : (
            <div className="total_amount_detail">
{/* TODO Commented this next line out as it's not working yet.              
              <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} /> */}
            </div>
          )
        }




      </div>
    </>

  );
};

export default ConferenceEvent;
