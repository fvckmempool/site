import React,{useState, useEffect} from 'react'
// import {getAllCategories, getDrinksByCategory} from '../api/coktail'
import {getCollection} from '../cargo/index'
import { Spin, Row, Col, Button, Modal} from 'antd'
// import DrinkCategories from '../components/drinks/DrinksCategories'
import DrinkList from '../components/drinks/DrinkList'
import Searchbar from '../components/drinks/Searchbar'
import DrinkInfo from '../components/drinks/DrinkInfo'


export default function Drinks(props){
    // const [categories, setCategories] = useState([])
    // const [category, setCategory] = useState(null)
    const [drinks, setDrinks] = useState([])
    const [drinkVisible, setDrinkVisible] =useState(false )
    const [drink, setDrink] = useState(null)
    const [allDrinks, setAllDrinks] = useState([])
    const [page, setPage] = useState(1)
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
            let randomDrinsk  = _drinks.sort((a,b) => 0.5 - Math.random())
            let _allDrinks = [];
            while(randomDrinsk.length) _allDrinks.push(randomDrinsk.splice(0,20)); 
            setAllDrinks(_allDrinks)           
            setDrinks(_allDrinks[0])
        }
    }
    const updateDrinks = (b) => {
        console.log(b)
        const tokenId = allDrinks[page][b].tokenId - 14
        const _drink = {...allDrinks[page][b].metadata, tokenId:tokenId}
        console.log(_drink)
        setDrink(_drink)
        setDrinkVisible(true)
    }
    const searchDrink = (data) => {
        const tokenId = data.tokenId - 14
        const _drink = {...data.metadata, tokenId:tokenId}
        setDrink(_drink)
        setDrinkVisible(true)

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
            <Searchbar drinks={allDrinks} parentCallback={(_drink) => searchDrink(_drink)}></Searchbar> 
            {
                drink !== null ?(
                    <Modal width={1200} visible={drinkVisible} footer={null} onCancel={() => setDrinkVisible(false)}>
                    <DrinkInfo drink={drink} id={drink.tokenId}/>
                </Modal>
                ):null
            }
                    <div className="">
                        <div className="my-3">
                            <Row gutter={[16,16]} justify="end">
                                { 
                                    pages.map((pg) => (
                                        <Col>
                                            <Button size="small" onClick={() => setPage(pg)} type={page === pg ? "active":"secondary"}>{pg}</Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                        {
                            drinks?(
                                <DrinkList parentCallback={(idx) => updateDrinks(idx)} drinks={drinks}></DrinkList>

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