import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Pagination.css';
function PageLink(props) {
    return (
        <li className={'page-item ' + props.className}>
            <a  onClick={props.click} className="page-link">{props.page}</a>
        </li>
    )
}
function Pagination({ totalPages, currentPage, setCurrentPage }) {
    let Pages = [];
    if (currentPage === 1) {
        Pages.push(
            <PageLink key='First' className='disabled' page='First' />
        )
    } else {
        Pages.push(
            <PageLink key='First' className=' ' page='First' click={() => setCurrentPage(1)} />
        )
    }
    // xac dinh i currentPage hien thi tien toi 5 va luu 5 so
    let i = (currentPage > 5) ? currentPage - 3 : 1;
    // neu i > 5 thi xuat hien dau 3 cham dau tien co nghia la truoc kia con pages
    if (i !== 1) {
        Pages.push(
            <PageLink key='dot' className='disabled' page='...' />
        )
    }
    // so pages hien thi tu currentPage + 4 tro xuong va i phai be thua hoac bang totalPages moi cho hien
    // khong thi break tung do
    while (i <= (currentPage + 3) && i <= totalPages) {
        if (i === currentPage) {
            Pages.push(
                <PageLink key='active' className='active' page={i} />
            )
            i++;
            continue;
            // hien thi danh sach cac trang tien toi 5 va luu 5 
        }
        let j = i;
        Pages.push(
            <PageLink key={i} className=' ' page={i} click={() => setCurrentPage(j)} />
        )
        // cuoi cung xem co nen hien thi con dau ... ?
        if (i === (currentPage + 3) && (i < totalPages)) {
            // hien thi 3 cham
            Pages.push(
                <PageLink key='dotLast' className='disable' page='...' />
            )
        }
        i++;
    }
    // cuoi cung la hien thi LastPage
    if (currentPage === totalPages) {
        // disable Last
        Pages.push(
            <PageLink key='disLast' className='disabled' page='Last' />
        )
    } else {
        // show last
        Pages.push(
            <PageLink key='showLast' className=' ' page='Last' click={() => setCurrentPage(totalPages)} />
        )
    }

    return (
        <ul className='pagination'>
            {Pages}
        </ul>
    )
}
export default Pagination;