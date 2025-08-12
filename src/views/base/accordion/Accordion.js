import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'


const Accordion = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Alunos </strong>
        </CCardHeader>
        <CRow className="my-4">
          <CCol md={6} className="md-6">
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Tipo de Filtro</label>
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
              <input type="text" class="form-control" aria-label="Text input with dropdown button" />
            </div>
          </CCol>
          <CCol>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Data de Inicio</label>
              <input type="date" class="form-control" placeholder="Data" aria-label="data" />
            </div>
          </CCol>
          <CCol>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Data de Fim</label>
              <input type="date" class="form-control" placeholder="Data" aria-label="data" />
            </div>
          </CCol>
          <CCol>
            <button type="button" class="btn btn-primary">Filtrar</button>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4}>
            <button type="button" class="btn btn-primary">Registar</button>
          </CCol>
        </CRow>
        <CCard className="my-4">
          <CCardBody>
            <table class="table table-bordered table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Número da Matrícula</th>
                  <th scope="col">Nome Completo</th>
                  <th scope="col">Turma</th>
                  <th scope="col">Série</th>
                  <th scope="col">Curso</th>
                  <th scope="col">Status Acadêmico</th>
                  <th scope="col">Nome do Responsável</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Situação Financeira</th>
                  <th scope="col">Data de Ingresso</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>2025001</td>
                  <td>Mark Otto</td>
                  <td>A</td>
                  <td>3ª Série</td>
                  <td>Engenharia</td>
                  <td>Ativo</td>
                  <td>Maria Otto</td>
                  <td>(11) 99999-0000</td>
                  <td>Em dia</td>
                  <td>15/02/2022</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Opções
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Ver</a></li>
                        <li><a class="dropdown-item" href="#">Editar</a></li>
                        <li><a class="dropdown-item text-danger" href="#">Excluir</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>2025002</td>
                  <td>Jacob Thornton</td>
                  <td>B</td>
                  <td>2ª Série</td>
                  <td>Direito</td>
                  <td>Trancado</td>
                  <td>João Thornton</td>
                  <td>(11) 98888-1234</td>
                  <td>Inadimplente</td>
                  <td>10/03/2021</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Opções
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Ver</a></li>
                        <li><a class="dropdown-item" href="#">Editar</a></li>
                        <li><a class="dropdown-item text-danger" href="#">Excluir</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>2025003</td>
                  <td>Larry Bird</td>
                  <td>C</td>
                  <td>1ª Série</td>
                  <td>Administração</td>
                  <td>Formado</td>
                  <td>Paulo Bird</td>
                  <td>(11) 97777-5678</td>
                  <td>Em dia</td>
                  <td>20/01/2020</td>
                  <td>
                    <div class="dropdown">
                      <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Opções
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Ver</a></li>
                        <li><a class="dropdown-item" href="#">Editar</a></li>
                        <li><a class="dropdown-item text-danger" href="#">Excluir</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
