import React, {FormEvent, useState} from "react";
import {Button, Form, Modal, Col, Row} from "react-bootstrap";
import {storeProduct} from "../../Services/Product";
import {useAuth} from "../../Contexts/Auth/AuthContext";
import {useAlert} from "../../Contexts/Alert/AlertContext";

export default function FormProduct(props: {showModal: boolean, closeModal: Function}) {
    const [name, setName] = useState<string>("");
    const [measuredUnit, setMeasuredUnit] = useState<string>("");
    const [groupOrder, setGroupOrder] = useState<number>(1);
    const [percentageProductCommission, setPercentageProductCommission] = useState<number>(0.0);
    const [priceSale, setPriceSale] = useState<number>(0.0);
    const [pricePurchase, setPricePurchase] = useState<number>(0.0);
    const [profitMargin, setProfitMargin] = useState<number>(0.0);
    const {token} = useAuth();
    const [validated, setValidated] = useState<object>({});
    const {success, warning, danger} = useAlert();

    function handle(event: FormEvent) {
        event.preventDefault();

        store();
    }

    async function store() {
        const response = await storeProduct(token, [{
            nome: name,
            margem_lucro: profitMargin,
            percentual_comissao_produto: percentageProductCommission,
            agrupar_pedido: groupOrder,
            unidade_medida: measuredUnit,
            preco_compra: pricePurchase,
            preco_venda: priceSale
        }]).then((response) => {
            if (response.data.code !== 1) {
                danger(response.data.human);
            }

            if (response.data.data.fails.length > 0) {
                response.data.data.fails.forEach((item: any) => {
                    let keys = Object.keys(item.validation);

                    for(let i=0;i<keys.length;i++) {
                        let key = keys[i],
                            message: string = "",
                            currentValidated: any = {};

                        message = item.validation[key].join(" ");

                        currentValidated[key] = {
                            valid: true,
                            message: message
                        };

                        setValidated(Object.assign(validated, currentValidated));
                    }
                });

                warning("Verifique as informações e tente novamente!");

                return false;
            }

            if (response.data.data.fails.length === 0 && response.data.data.success.length > 0) {
                closeModalValuesDefault();
                success("Produto cadastrado com sucesso!");

                return true;
            }

            danger("Ops! Algum problema aconteceu. Tente novamente!");

            return false;
        })
    }

    function convertDecimalToString(value: number) {
        let format = Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        });

        return format.format(value).replace("R$", "").trimLeft();
    }
    
    function convertStringToDecimal(value: string, maxChars: number) {
        let valid = value.replace(/[^0-9\.]+/g, '').replaceAll(".", "").replace(",", ".");

        if (valid.length === 0) {
            return 0.00;
        }

        value = value.replaceAll(".", "").replace(",", ".");

        let pointPosition = value.indexOf("."),
            concatValue = `${value.substr(0, pointPosition)}${value.substr(pointPosition+1)}`;

        if (concatValue.length > maxChars) {
            concatValue = concatValue.substr(0, concatValue.length-1);
        }

        let positionPointAdjusted = concatValue.length - 2;

        return parseFloat(`${concatValue.substr(0, positionPointAdjusted)}.${concatValue.substr(positionPointAdjusted)}`);
    }

    function verifyValidate(key: string): boolean {
        if (!validated.hasOwnProperty(key)) {
            return false;
        }
        
        // @ts-ignore
        return validated[key].valid;
    }

    function verifyMessageValid(key: string): string {
        if (!validated.hasOwnProperty(key)) {
            return "";
        }

        // @ts-ignore
        return validated[key].message;
    }

    function valuesDefault(): void {
        setName("");
        setPriceSale(0.00);
        setPricePurchase(0.00);
        setProfitMargin(0.00);
        setPercentageProductCommission(0.00);
        setGroupOrder(1);
        setMeasuredUnit("");
        setValidated({});
    }

    function closeModalValuesDefault(): void {
        valuesDefault();
        props.closeModal();
    }

    return (
        <Modal size="lg" show={props.showModal} onHide={() => {
            closeModalValuesDefault();
        }} backdrop="static" keyboard={false} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control isInvalid={verifyValidate("nome")} type="text" defaultValue="" placeholder="Nome" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}/>
                                <Form.Control.Feedback type="invalid">
                                    {verifyMessageValid("nome")}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupMeasuredUnit">
                                <Form.Label>Unidade Medida*</Form.Label>
                                <Form.Control type="text" defaultValue="" placeholder="Unidade Medida" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setMeasuredUnit(event.target.value);
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupGroupOrder">
                                <Form.Label>Agrupar pedido</Form.Label>
                                <Form.Control as="select" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setGroupOrder(parseInt(event.target.value));
                                }}>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupPricePurchase">
                                <Form.Label>Preço compra*</Form.Label>
                                <Form.Control type="text" value={convertDecimalToString(pricePurchase)} placeholder="Preço compra" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    let value = event.target.value,
                                        formatted = convertStringToDecimal(value, 17);

                                    setPricePurchase(formatted);
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupProfitMargin">
                                <Form.Label>Margem lucro</Form.Label>
                                <Form.Control type="text" value={convertDecimalToString(profitMargin)} placeholder="Margem lucro" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    let value = event.target.value,
                                        formatted = convertStringToDecimal(value, 17);

                                    setProfitMargin(formatted);
                                    setPriceSale((((formatted / 100) * pricePurchase)) + pricePurchase);
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupPriceSale">
                                <Form.Label>Preço venda*</Form.Label>
                                <Form.Control type="text" value={convertDecimalToString(priceSale)} placeholder="Preço venda" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    let value = event.target.value,
                                        formatted = convertStringToDecimal(value, 17);

                                    setPriceSale(formatted);
                                }}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formGroupPercentageProductCommission">
                                <Form.Label>Porcentagem comissão</Form.Label>
                                <Form.Control type="text" value={convertDecimalToString(percentageProductCommission)} placeholder="Porcentagem comissão" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    let value = event.target.value,
                                        formatted = convertStringToDecimal(value, 17);

                                    setPercentageProductCommission(formatted);
                                }}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handle}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}