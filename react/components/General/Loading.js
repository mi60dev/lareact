import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loading }) => (
        <Loader
         className="loader"
         type="Grid"
         color="#dedede"
         height={50}
         width={50}
         visible={loading}
        />
);

export default Loading;
