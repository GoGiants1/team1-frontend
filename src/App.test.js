import App from './App';
import {Provider} from "react-redux";
import React from "react";
import {history} from "./store/store";
import {getMockStore} from "./test-utils/mocks";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

const mockStore = getMockStore({});
describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    );
  });

  it('should render', () => {
    const component = shallow(app);
  });

});

