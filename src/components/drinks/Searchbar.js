import React, { useEffect, useState } from 'react';
import {Input, Button, Row, Col} from 'antd'
const { Search } = Input;

export default function Searchbar({drinks, parentCallback}){

    const [options,setOptions] = useState([]) 
    const [drinkList,setdrinkList] = useState([]) 

    const onSearch = (searchText) => {
        console.log(searchText)
        if(searchText.length > 0){
            const filtered = drinkList.filter((el) => {                
                return(el && el.metadata && el.metadata.name.slice(0,searchText.length).toLowerCase() === searchText.toLowerCase())
            })
            setOptions(filtered);
        }else{
            setOptions([])
        }
    };


    
    useEffect(() => {
        console.log(options)
    }, [options])
    useEffect(() => {
        if(drinks){
            let _drinks = []
            for(let el in drinks){
                for(let col in drinks[el]){
                    _drinks.push(drinks[el][col])
                }
            }
            setdrinkList(_drinks)
        }
    },[drinks])
    const onClick = (opt) => {
        setOptions([])
        parentCallback(opt)
    }
    return(
        <div className="my-3 container">
            <Row>
                <Col span={24} >
                <Search  onChange={(evt) => onSearch(evt.target.value)}></Search>
                <div className="searchResults" cl>
                {
                        options.map((opt) => (
                            <div  className="searchResult p-3">
                                <Button type="link" onClick={() => onClick(opt)}>
                                {opt.metadata.name}
                                </Button>
                            </div>
                        ))
                    }
                </div>
                </Col>
            </Row>
        </div>
    )
}  