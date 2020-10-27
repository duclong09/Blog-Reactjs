import React from 'react';

class Columns extends React.Component {
    render() {
      return (
        <React.Fragment>
          <td>Day la td 1</td>
          <td>Day la td so 2</td>
        </React.Fragment>
      );
    }
  }
  class Fragment extends React.Component {
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
export default Fragment;