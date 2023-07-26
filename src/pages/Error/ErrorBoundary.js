import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {

            return (
                <div className='h-[100vh] flex flex-col justify-center items-center'>
                    <h1 className='text-[50px]'>500</h1>
                    <h2 className='text-[30px]'>Something went wrong!</h2>
                    <p>Some Error Occured </p>


                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;