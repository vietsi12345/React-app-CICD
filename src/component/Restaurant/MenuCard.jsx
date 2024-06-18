import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { categoriezIngredients } from '../Ultil/categoriezIngredients';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, findCart } from '../State/Cart/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import { formatMonneyVietNam } from '../Ultil/formatMonneyVietNam';

export const MenuCard = ({ item, restaurantId, vagetarian, nonveg, seasonal, drinkCategory }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store);

    const handleCheckboxChange = (value) => {
        if (selectedIngredients.includes(value)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== value));
        } else {
            setSelectedIngredients([...selectedIngredients, value]);
        }
    };


    const handleAddToCart = (e) => {
        // e.preventDefault();  // Ngăn chặn việc submit form mặc định
        const reqData = {
            token: localStorage.getItem('jwt'),
            cartItem: {
                drinkId: item.id,
                quantity: 1,
                ingredients: selectedIngredients,
            },
        };
        dispatch(addItemToCart(reqData));
        // dispatch(findCart(reqData.token)); // cập nhật lại giỏ hàng 
        // dispatch(getMenuItemsByRestaurantId({
        //     jwt: reqData.token,
        //     restaurantId: restaurantId,
        //     vagetarian: vagetarian,
        //     nonveg: nonveg,
        //     seasonal: seasonal,
        //     drinkCategory: drinkCategory,
        // }))

        // console.log('reqData', reqData);
        // Load lại trang sau khi thêm vào giỏ hàng
        window.location.reload();
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} />
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>{item.name}</p>
                            <p>{formatMonneyVietNam(item.price)}</p>
                            <p className='text-gray-400'>{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleAddToCart}>
                    <div className='flex gap-5 flex-wrap'>
                        {Object.keys(categoriezIngredients(item?.ingredientsItems)).map((category, index) => (
                            <div key={index}>
                                <p>{category}</p>
                                <FormGroup>
                                    {categoriezIngredients(item.ingredientsItems)[category].map((e, i) => (
                                        <FormControlLabel
                                            key={i}
                                            control={<Checkbox onChange={() => handleCheckboxChange(e.name)} />}
                                            label={e.name}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <div className='pt-5'>
                        <Button variant='contained' type="submit">
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
};
