import { type JSX } from "react";

const GroceryList = (): JSX.Element => {
  return (
    <>
      <h1>Grocery List Name</h1>
      <main>
        <section>
          <h2>Add Item</h2>
          {/* onSubmit={handleSubmit}  */}
          <form autoComplete="off">
            <div>
              <label htmlFor="name">Item name:</label>
              <input
                type="name"
                name="name"
                id="name"
                // value={formData.name}
                // onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="quantity"
                name="quantity"
                id="quantity"
                // value={formData.name}
                // onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="expirationDate"
                name="expirationDate"
                id="expirationDate"
                placeholder="yyy-mm-dd"
                // value={formData.name}
                // onChange={handleInputChange}
              />
            </div>
            <button>Add Item</button>
            {/* Creates an item */}
          </form>
        </section>

        <section>
          {/* Loop through items to show all items in the grocery list and show a checkbox for each item and the item name*/}
          <h2>Items</h2>
          <form>
            {/* <div>
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms || false}
                onChange={onInputChange}
              />
              <label htmlFor="agreeToTerms">
                Agree to the terms and conditions
              </label>
              {errors.agreeToTerms && <p>{errors.agreeToTerms}</p>}
            </div> */}
            <button>Add to fridge</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default GroceryList;
