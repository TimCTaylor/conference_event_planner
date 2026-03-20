import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";


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
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      // Ensure numberOfPeople is set before toggling selection
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, newNumberOfPeople));
    }
    else {
      dispatch(toggleMealSelection(index));
    }
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
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost * numberOfPeople;
        }
      });
    }
    return totalCost;
  };


  const avTotalCost = calculateTotalCost("av");
  const venueTotalCost = calculateTotalCost("venue");
  const mealsTotalCost = calculateTotalCost("meals");


  const navigateToProducts = (idType) => {
    if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
      if (showItems) { // Check if showItems is false
        setShowItems(!showItems); // Toggle showItems to true only if it's currently false
      }
    }
  }

  const mealsItems = useSelector((state) => state.meals);

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

                {/* Controlled input vs uncontrolled input
                This is a common React pattern for handling form inputs.

                With controlled inputs, the React state is the single source of truth. We control it at all times.
                With uncontrolled input, the DOM is the source of truth. We don't know what's in the input box until we read it later. The
                browser manages the input, which means, amongst other things, that it could be invalid temporarily.
                We could have done this with an uncontrolled input, which would look something like this:
                  <input type="number" min="1" />
                And we would probably read the value and validate it on form submission or button press.

                Here, we are controlling the value through the value prop.
                When we type in the input box, the onChange event is triggered, which calls the function that updates the state with the new value.
                Note how with our simple validation logic, we can write the onChange handler inline, rather than split the code up into a separate
                function.

                NaN - this is a special Javascript value that means Not a Number, and is returned as a value.
                You always check for it with isNan(), never with a comparison operator (e.g., value === NaN will always return false, even if value is actually NaN). 
                */}
                <div className="input-container venue_selection">
                  <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                  <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);

                      if (isNaN(value) || value < 1) {
                        setNumberOfPeople(1);
                      } else {
                        setNumberOfPeople(value);
                      }
                    }}
                    min="1"
                  />
                </div>

                <div className="meal_selection">
                  {/* Remember - this is a common React pattern. We use map() to iterate over an array (mealsItems). For each item, we call the
                  provided function to render the JSX. */}
                  {mealsItems.map((item, index) => (
                    // Remember that React wants the key prop to keep track of elements in a list. Here, we're using the index as the key, which is generally not recommended for dynamic lists, but is acceptable for static lists that won't change order or have items added/removed. In a real application, it would be better to have a unique identifier for each meal item and use that as the key.
                    <div className="meal_item" key={index} style={{ padding: 15 }}>
                      <div className="inner">
                        <input type="checkbox" id={`meal_${index}`}
                          checked={item.selected}
                          onChange={() => handleMealSelection(index)}
                        />
                        <label htmlFor={`meal_${index}`}> {item.name} </label>
                      </div>
                      <div className="meal_cost">${item.cost}</div>
                    </div>
                  ))}
                </div>

                <div className="total_cost">Total Cost: {mealsTotalCost}</div>



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
