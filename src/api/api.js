/* eslint-disable no-prototype-builtins */
import axios from 'axios';
//https://circleci.com/blog/making-http-requests-with-axios/

//api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;


/* useEffect(() => {
  (async () => {
    const { data } = await api.get('/users');

    setUsers(data);
  })();
}, []); */

const gasId = "AKfycbwvzxhkmw7MgQWswDox83wxMXjQK6QTE80JinTJwKTMp1MGeSkZ1PvtAlL77B8KAHwFjA";

export const url = `https://script.google.com/macros/s/${gasId}/exec`

const serialize = async function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const query = async (payload) =>{
  return "?" + await serialize(payload)
}


export function get(table) {
  return new Promise((resolve, reject) => {
    console.log('executando a query...')

    axios.get(url,{
        params: {
          method: 'list',
          table: table,
        },
      })
      .then((res) => {
        console.log('res.data', res.data)
        return resolve(res.data);
      })
      .catch((err) => {
        console.log(err)
        return reject(err);
      });
  });
}

export function fetchTable () {
  return fetch('http://localhost:3001/notes')
  .then((response) => response.json())
  .then(({ success, data }) => {
    if (!success) {
      throw new Error ('An error occurred while fetching notes');
    }
    return data;
  })
}





export const fetchQuery = async (body) => {
  
  const requestOptions = (objBody) => {
    return {
      redirect: "follow",
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(objBody),
    };
  };

  const response = await fetch(url, requestOptions(body));
  return await response.json();
};



