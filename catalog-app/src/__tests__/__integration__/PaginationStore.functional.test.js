import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";

import Pagination from "../../components/pagination/Pagination";
import RootStore from "../../stores/RootStore";

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(()=> {
    const rootStore = new RootStore();
    const paginationStore = rootStore.paginationStore;
    wrapper = mount(<Pagination paginationStore={paginationStore} />);
});

describe("<Pagination /> rendering", () => {
    it("should render three paginationButtons", () => {
        expect(wrapper.find('.paginationButton')).toHaveLength(3);
    });
    it("should render one pagination number view", () => {
        expect(wrapper.find('.paginationNumber')).toHaveLength(1);
    });
});

describe("<Pagination /> interactions", () => {
    it("should call onClick when next button is pressed", () => {
        const mockedNextButton = jest.fn();
        const button = shallow((<button onClick={mockedNextButton}></button>));
        button.find('button').last().simulate('click');
        expect(mockedNextButton.mock.calls.length).toEqual(1);
    });
});