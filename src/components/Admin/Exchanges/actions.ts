import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
} from './types';
import * as api from 'Utils/api';
// import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';

// export const loadArticle = (slug: string) => {
//   return (dispatch) => {
//     dispatch(createAction(PUBLIC_ARTICLES_ARTICLE, { status: Status.createLoading() }));

//     api.article(slug)
//       .then(result => {
//         dispatch(createAction(PUBLIC_ARTICLES_ARTICLE, { status: Status.createSuccess(), data: result.data }));
//         dispatch(hideMessage(MSG_ARTICLES));
//       })
//       .catch(err => {
//         dispatch(createAction(PUBLIC_ARTICLES_ARTICLE, { status: Status.createError() }));
//         dispatch(showMessage(err, 'error', MSG_ARTICLES));
//       });
//   };
// };
