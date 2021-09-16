import React from 'react';
import { action } from '@storybook/addon-actions';
import BoardTemplate from '.';
import { makeSummarizedPostMock } from '../../../__mocks__/client-mock-data';

export default {
  title: 'Template/Board',
  component: BoardTemplate,
};

const clickAction = action('click');
const submitAsyncAction = async () => {
  action('submit');
};
export const boardTemplate = (): React.ReactElement => {
  const summarizedPosts = [makeSummarizedPostMock({}), makeSummarizedPostMock({}), makeSummarizedPostMock({})];
  return (
    <BoardTemplate
      posts={summarizedPosts}
      board="board"
      getPosts={submitAsyncAction}
      totalPage={12}
      currentPage={1}
      handlePagination={clickAction}
    />
  );
};
