import axios from "axios";
import React, { createContext, useReducer, useState, useEffect } from "react";
import reducer from "./Reducer.js";

const initialState = {
    Product: [],
};
// console.log("initialState ", initialState.Product)

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [data, setData] = useState([]);
    //   console.log("______________________")
    //   console.log("Data ", data)
    //   console.log("______________________")
    const [isLoading, setIsLoading] = useState(true);

    const deleteData = (id) => {
        console.log("Working")
        const array = data.filter((item, index) => index !== id)
        setData(array)
    }

    const updateData = (id, newData) => {
        console.log("id", id)
        console.log("newData", newData)
        setData(data?.map((item, index) => {
            if (item.id === id) {
                console.log("okay")
                return newData;
            }
            return item;
        }));
    };

    const AddNewData = (AddNewData) =>{
        // console.log("AddNewData " , AddNewData)
        setData([AddNewData, ...data])

    }





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                const newData = response.data.map((item) => {
                    const dis = Math.floor(Math.random() * 50);
                    return {
                        
                        ...item, discount: dis
                    }

                })
                setData(newData);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const [state, dispatch] = useReducer(reducer, initialState);


    // useEffect(() => {
    //     // console.log("data",data)
    //     data.forEach(() => {



    //     })
    //     dispatch({
    //         type: "SET_Product",
    //         payload: data?.map((item) => ({
    //             id: item.id,
    //             type: item.category,
    //             price: item.price,
    //             title: item.title,
    //             rating: item.rating,
    //             image: item.image,
    //             description: item.description,
    //         })),
    //     });

    // }, [data]);
    // console.log("state", state)

    // initialState.Product.push(data)

    return (
        <GlobalContext.Provider
            value={{
                data,
                deleteData,
                updateData,
                AddNewData,
                Product: state.Product,
            }}
        >
            {isLoading ? <div>Loading...</div> : children}
        </GlobalContext.Provider>
    );
};





























// import axios from "axios";
// import React, { createContext, useReducer, useState, useEffect } from "react";
// import reducer from "./Reducer.js";

// const initialState = {
//     Product: [],
// };
// console.log("🚀 ~ file: GlobalState.js:8 ~ initialState:", initialState)

// export const GlobalContext = createContext(initialState);

// export const GlobalProvider = ({ children }) => {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://fakestoreapi.com/products");
//                 setData(response.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, []);

//     const [state, dispatch] = useReducer(reducer, initialState);

//     useEffect(() => {
//         dispatch({
//             type: "SET_Product",
//             payload: data.map((item) => ({
//                 id: item.id,
//                 type: item.type,
//                 amount: item.price,
//                 description: item.title,
//             })),
//         });
//     }, [data]);

//     // const addTransaction = (transaction) => {
//     //     dispatch({
//     //         type: "ADD_TRANSACTION",
//     //         payload: transaction,
//     //     });
//     // };

//     // const deleteTransaction = (id) => {
//     //     dispatch({
//     //         type: "DELETE_TRANSACTION",
//     //         payload: id,
//     //     });
//     // };

//     useEffect(() => {
//         if (state.Product.length === 0 && data.length > 0) {
//             dispatch({
//                 type: "SET_Product",
//                 payload: data.map((item) => ({
//                     id: item.id,
//                     type: item.type,
//                     amount: item.price,
//                     description: item.title,
//                 })),
//             });
//         }
//     }, [data, state.Product.length]);

//     return (
//         <GlobalContext.Provider
//             value={{
//                 data,
//                 Product: state.Product,
//                 // addTransaction,
//                 // deleteTransaction,
//             }}
//         >
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : (
//                 children
//             )}
//         </GlobalContext.Provider>
//     );
// };
