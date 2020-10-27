import React from 'react';
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      // this.state = {temperature: ''};
    }
  
    handleChange(e) {
      // this.setState({temperature: e.target.value});

      //Bây giờ, khi TemperatureInput muốn cập nhật nhiệt độ, 
      //nó gọi this.props.onTemperatureChange:
      this.props.onTemperatureChange(e.target.value);

      //Prop onTemperatureChange sẽ được truyền vào cùng với prop temperature bởi
      // component cha Calculator.

      //Khi prop thay đổi, nó sẽ sửa lại chính state cục bộ của nó, vì thế sẽ tạo lại cả hai input với các giá trị mới.
   
   //Khi chúng ta muốn thay đổi, việc gọi hàm this.setState() được thay bằng hàm this.props.onTemperatureChange() từ component cha Calculator:
  // Bây giờ hãy cùng chuyển sang component Calculator. 
  }
  
    render() {
      // const temperature = this.state.temperature;
      // Chuyển state lên trên
      const temperature = this.props.temperature; // chuyen len thang cha tren bang props
      //Lúc trước, khi temperature ở trong state cục bộ, component TemperatureInput chỉ cần gọi this.setState() để thay đổi nó.
      // Tuy nhiên, khi temperature được truyền vào từ component cha như là một prop, 
      //thì TemperatureInput không có quyền kiểm soát nó nữa.
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature}
                 onChange={this.handleChange} />
        </fieldset>
      );
    }
  }
  export default TemperatureInput;