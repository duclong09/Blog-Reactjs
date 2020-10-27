// linux set hide source
// "build": "GENERATE_SOURCEMAP=false react-scripts build",

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    getNumPages(currentPage) {
        { this.handlePageChange }
        this.setState({ per_page: this.props.results, currentPage: currentPage + 1, previousPage: currentPage - 1 });
    }

    handlePageChange(page, evt) {
        const currentPage = this.state.currentPage || 1;
        const numPages = this.getNumPages();
        const pageLinks = [];
        if (currentPage > 1) {
            if (currentPage > 2) {
                pageLinks.push(1);
                pageLinks.push(' ');
            }
            pageLinks.push(currentPage - 1);
            pageLinks.push(' ');
        }
        for (let i = 1; i <= numPages; i++) {
            const page = i;
            pageLinks.push(page);
        }
        if (currentPage < numPages) {
            pageLinks.push(' ');
            pageLinks.push(currentPage + 1);
            if (currentPage < numPages - 1) {
                pageLinks.push(' ');
                pageLinks.push(numPages);
            }
        }
        this.setState({ currentPage: currentPage + 1 });
        this.setState({ previousPage: currentPage - 1 });
    }

    render() {
        const per_page = "10";
        const paginationData = this.props.results;
        let numPages = Math.ceil(paginationData.length / per_page);
        if (paginationData.length % per_page > 0) {
            numPages++;
        }
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">ORDERS LIST</div>
                <table className="table table-hover">
                    <thead >
                        <tr>
                            <th>Customer Name</th>
                            <th>Assignee</th>
                            <th>Status</th>
                            <th>Creation Date </th>
                        </tr>
                    </thead>
                    <SearchResultsList items={this.props.results} open={this.props.open} current_Page={this.state.currentPage} />
                </table>

                <Pagination id="content" className="users-pagination pull-right" bsSize="medium"
                    first last next prev boundaryLinks items={numPages}
                    activePage={this.state.currentPage} onSelect={this.handlePageChange} />
            </div >
        );
    }
}

class SearchResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const per_page = 10;
        const pages = Math.ceil(this.props.items.length / per_page);
        const current_page = this.props.current_Page || 1;
        const start_offset = (current_page - 1) * per_page;
        let start_count = 0;
        return (<tbody>{this.props.items
            .sort((a, b) => moment(b.order_date) - moment(a.order_date) || b.order_number - a.order_number)
            .map((item, index) => {
                if (index >= start_offset && start_count < per_page) {
                    start_count++;
                    return <SearchResultsItem key={item.id} item={item} open={this.props.open} />;
                }
            })
        }
        </tbody>
        );
    }
}

  // function A(props) {

  //   return (

  //     pageNumbers.map(number => (

  //         <li key={number} className='page-item'>
  //           <a onClick={() => paginate(number)} href={`/post/${number}`} className='page-link'>
  //             {number}
  //           </a>
  //         </li>
  //     ))
  //   )
  // }

  const pageNumbers = [];
  // danh sach cac trang la i la mang
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }



  if (currentPage === 1) {
    Pages.push(
        <PageLink key='ad' className="disabled" page='First' />
    )
} else {
    Pages.push(
        <PageLink key='a' className=" " page='First' click={() => setCurrentPage(1)} />
    )
}
let i = Number(currentPage) > 5 ? Number(currentPage - 3) : 1;
if (i !== 1) {
    Pages.push(
        <PageLink key={i} className="disabled" page='...' />
    )
}
while ((i <= (Number(currentPage) + 3)) && (i <= totalPages)) {
    if (i === currentPage) {
        Pages.push(
            <PageLink key={i} className="active" page={i} />
        )
    } else {
        Pages.push(
            <PageLink key={i} className=" " page={i} click={() => setCurrentPage(i)} />
        )
    }
    if (i === Number(currentPage) + 3 && i < totalPages) {
        Pages.push(
            <PageLink key={i} className="disabled" page='...' />
        )
    }
    i++;
}
if (currentPage === totalPages) {
    Pages.push(
        <PageLink key='cssfd' className="disabled" page='Last' />
    )
}else {
    Pages.push(
        <PageLink key='asdffasd' className=" " page='Last' click={() => setCurrentPage(totalPages)} />
    )
}
// buil script
// "build": "set \"GENERATE_SOURCEMAP=false\" &&  react-scripts build",

// CALL API IN REDUCER
// const reducer = (state = initialState, action) => {
//     if (action.type === "DELETE_POST") {
//       //  axios.delete(`/delete/${action.postId}`).then((response) => {
//     //   //   return {
//     //   //     ...state,
//     //   //     isShowModal: state.isShowModal = true,
//     //   //     type: state.type = response.data.status,
//     //   //     message: state.message = response.data.message,
//     //   //   };
//     //   // });
//     //   // console.log(state);
//     //   return {
//     //     ...state,
//     //     isShowModal:true,
//     //     type: 'success',
//     //     message:'Xin chao !'
//     //   }
//     // }