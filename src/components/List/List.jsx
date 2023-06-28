import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import useFetch from "../../hooks/useFetch"
import "./List.scss";

const List = () => {
    const { data } = useFetch('https://fakestoreapi.com/products/categories')

    return (
        <ListGroup>
            {data && data.length > 0 && data.map((item, index) => {
                return (
                    <ListGroup.Item key={index}>
                        <Form.Check
                            type="checkbox"
                            label={item}
                            id={`${index}-${item}`}
                        />
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export default List;