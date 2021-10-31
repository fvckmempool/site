import React,{useState, useEffect} from 'react'
// import {getAllCategories, getDrinksByCategory} from '../api/coktail'
import {getCollection} from '../cargo/index'
import { Spin, Row, Col, Button} from 'antd'
// import DrinkCategories from '../components/drinks/DrinksCategories'
import DrinkList from '../components/drinks/DrinkList'

export default function Drinks(props){
    // const [categories, setCategories] = useState([])
    // const [category, setCategory] = useState(null)
    const [drinks, setDrinks] = useState([])
    const [allDrinks, setAllDrinks] = useState([])
    const [page, setPage] = useState(0)
    const pages = [1,2,3,4,5]
    // const getCategories = async () => {
    // const response = await getAllCategories().catch((err) => console.log(err))
    //     if(response && response.drinks) {
    //         const _categories = response.drinks.sort()
    //         console.log(_categories)
    //         setCategories(response.drinks)
    //         setCategory(_categories[0].strCategory)
    //     }
    // }
    const getDrinks = async () => {
        const _drinks = await getCollection().catch((err) => {console.log(err)})
        if(_drinks){
            setAllDrinks(_drinks)
            const _allDrinks = [];
            while(_drinks.length) _allDrinks.push(_drinks.splice(0,20)); 
            setAllDrinks(_allDrinks)           
            setDrinks(_allDrinks[0])
        }
    }
    useEffect(() => {
        if(allDrinks.length === 0){
            getDrinks()
        }
    // eslint-disable-next-line
    }, [])
    // useEffect((oldCategory) => {
    //     if(category !== null && oldCategory !== category){
    //        getDrinks() 
    //     }
    // }, [category])
    useEffect(() => {
        if(allDrinks && allDrinks.length > 0){
            const _drinks = allDrinks[page -1]
            setDrinks(_drinks)
        }
    // eslint-disable-next-line
    },[page])
    return(
        <div className="whiteBg">
            <div className="container py-5">
                    <div className="">
                        <div className="my-3">
                            <Row>
                                { 
                                    pages.map((pg) => (
                                        <Col span={1}>
                                            <Button onClick={() => setPage(pg)} type={page === pg ? "primary":"secondary"}>{pg}</Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                        {
                            drinks?(
                                <DrinkList drinks={drinks}></DrinkList>

                            ):(
                                <div className="d-flex justify-content-center">
                                    <Spin/>
                                </div>
                            )

                        }

                    </div>
            </div>
        </div>
        )
}