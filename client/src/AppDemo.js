import React from 'react';
// DEMO REACTJS
// ---- PHAN 1 --- //
// Tran Cong Hoa
import Composition from './DEMO/Phan1-Noi-Dung-Chinh/Composition/Composition';
import Inheritance from './DEMO/Phan1-Noi-Dung-Chinh/Inheritance/Inheritance';
import ThinkingInReact from './DEMO/Phan1-Noi-Dung-Chinh/Thinking-in-react/Thinking-in-react';
import WithOutFragment from './DEMO/Phan2-Advanced-Guide/Fragments/WithoutFragments';
import Refs from './DEMO/Phan2-Advanced-Guide/Forwarding-Refs/Refs';
import Fragment from './DEMO/Phan2-Advanced-Guide/Fragments/Fragment';
import MyHOC from './DEMO/Phan2-Advanced-Guide/Higher-Order-Component/HigherOderComponent';
import LiftingStateUp from './DEMO/Phan1-Noi-Dung-Chinh/Lifting-State-Up/Caculator';
import Hoa from './DEMO/Hoa/demo';

import NinhAppPerson from './DEMO/Ninh/NinhAppPerson';
// Ho Duc Long

// Tran Vu Ninh

// Phan Van Phuc Em

// Huynh Quoc Khanh
const PRODUCTS = [
  {category: 'Máy Tính', price: '$49.99', stocked: true, name: 'máy tính 1'},
  {category: 'Máy Tính', price: '$9.99', stocked: true, name: 'máy tính 2'},
  {category: 'Máy Tính', price: '$29.99', stocked: false, name: 'máy tính 3'},
  {category: 'Điện Thoại', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Điện Thoại', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Điện Thoại', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
function AppDemo() {
  return (
    //   -- PHAN 1 -- //
    // Tran Cong Hoa
    // <Composition/>
    // <Inheritance/>
    // <ThinkingInReact products={PRODUCTS}/>
    // <Refs/>
    // <WithOutFragment/>
    // <Fragment/>
    <LiftingStateUp/>
    // <MyHOC/>
    // <NinhAppPerson/>
  );
}

export default AppDemo;
