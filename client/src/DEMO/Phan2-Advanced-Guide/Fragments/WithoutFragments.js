import React from 'react';
class Columns extends React.Component {
    render() {
      return (
        <div>
          <td>cot so  1</td>
          <td>cot so 2</td>
        </div>
      );
    }
  }
class WithOutFragment extends React.Component {
    render() {
      return (
        <table>
          <tr>
            <Columns />
          </tr>
        </table>
      );
    }
  }
export default WithOutFragment;



