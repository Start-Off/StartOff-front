/**
 * @jest-environment jsdom
 */
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { render } from '../../test-utils';
import StudyBoardPage from '../StudyBoard';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<StudyBoard> 페이지', () => {
  it('snapshot 체크', async () => {
    const component = render(<StudyBoardPage />);
    await waitFor(() => expect(component.container).toMatchSnapshot());
  });

  it('렌더링 테스트', async () => {
    const component = render(<StudyBoardPage />);

    component.getByText('글 쓰기');
    component.getByText('검색');
  });

  it('로그인 없이 글 쓰기 버튼 클릭 시 에러', async () => {
    const component = render(<StudyBoardPage />);

    const createPostButton = component.getByText('글 쓰기');
    fireEvent.click(createPostButton);

    await component.findByText('로그인이 필요합니다');
  });
});