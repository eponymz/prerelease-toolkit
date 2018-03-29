const fetchIan = async () => {
  const res = await fetch(
    'http://slick.sofitest.com/api/projects/byname/isabey_initiated',
    {
      method: 'GET'
    }
  );
  const json = await res.json();
  console.log(json.releases['0'].builds);
  // console.log(json);
};

//fetchIan();

export default fetchIan;
