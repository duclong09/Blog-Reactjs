import React from "react";
//hiển thị dòng category theo từng nhóm sản phẩm
class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

// hiển thị dòng sản phẩm
class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}
// Bảng hiển thị đầy đủ sản phẩm danh mục
class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;// default '' depend state
        const inStockOnly = this.props.inStockOnly;// default false depen state
 
        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            // tìm tên sp này không có bỏ qua mặc định giá trị trong filterText là '' = 0
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            // check cac san pham theo trang thai true moi cho hien
            if (inStockOnly && !product.stocked) {
                return;
            }
            // khác null và khác category hiện tại thì đẩy vào mảng
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            // còn lại đẩy các dòng sản phẩm vào mảng
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
            lastCategory = product.category;
        });

        return (
            <table style={{background:'orange', width:"100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>


                <tbody style={{width:"100%"}}>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
      }
      
      handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
      }
      
      handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
      }
      
      render() {
        return (
          <form style={{background:'yellow'}}>
            <input style={{width:'100%'}}
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
            <p>
              <input 
                type="checkbox"
                checked={this.props.inStockOnly}
                onChange={this.handleInStockChange}
              />
              {' '}
              Only show products in stock
            </p>
          </form>
        );
      }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          filterText: '',
          inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
      }
      handleFilterTextChange(filterText) {
        this.setState({
          filterText: filterText
        });
      }
      
      handleInStockChange(inStockOnly) {
        this.setState({
          inStockOnly: inStockOnly
        })
      }
    render() {
        return (
            <div style={{margin:"0 auto", width: "300px", background:'green'}}>
              <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onInStockChange={this.handleInStockChange}
              />
              <ProductTable
                products={this.props.products}

                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
              />
            </div>
          );
    }
}

export default FilterableProductTable;

//   ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
//   );