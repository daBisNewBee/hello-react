import React, { useEffect, useState } from "react";
import axios from "axios";

/*
希望组件加载以后，网页标题（document.title）会随之改变。
那么，改变网页标题这个操作，就是组件的"副效应"，必须通过useEffect()来实现
*/
function Welcome(props) {
    // useEffect( () => {
    //     document.title = '加载完成';
    // });
    useEffect( () => {
      console.log("useEffect call");
        document.title = `Hello, ${props.name}`;
        // 这里可以unsubscribe注册返回值，发生在组件卸载时
    }, [props.name]); // 第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（props.name）。只有该变量发生变化时，副效应函数才会执行
    return <h1>Hello, {props.name}</h1>
};

// useState()用来生成一个状态变量（data），保存获取的数据；useEffect()的副效应函数内部有一个 async 函数
// 用来从服务器异步获取数据。拿到数据以后，再用setData()触发组件的重新渲染。
// 由于获取数据只需要执行一次，所以上例的useEffect()的第二个参数为一个空数组。
function MyApp() {
    const [data, setData] = useState({ hits: [] });

    useEffect( () => {
        const fetchData = async () => {
            const result = await axios(
                'https://hn.algolia.com/api/v1/search?query=redux'
            );
            console.log(result);
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <ul>
            { data.hits.map( item => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
}


export  {MyApp};
export  {Welcome};