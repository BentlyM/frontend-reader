const BlogCard = ({id , title, content}:{id: number, title: string, content: string}) => {
  return (
    <div 
      style={{
        backgroundColor: '#fff',
        border: '1px solid gray',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}
    >
      <h4
        style={{
          backgroundColor: '#4ade80',
          boxShadow: '2px 10px 0 -7px green',
          color: '#fff',
          marginBottom: '8px',
          marginTop: '0px'
        }}
      >
        {title}
      </h4>
      <p>
        {content}
      </p>
      <a href={`/post/${id}`} style={{width: 'fit-content'}}>Show more</a>
    </div>
  );
};

export default BlogCard;
