// import { useEffect, useState } from "react";
// import supabase from "../../../supaBaseClient";

// export default function ModalAluno({ alunoEditando, onSalvo }) {
//   const [formData, setFormData] = useState({
//     nome: "",
//     data_nascimento: "",
//     email: "",
//     telefone: "",
//     casa_numero: "",
//     bairro: "",
//     municipio: "",
//     distrito: "",
//     provincia: "",
//     responsavel_id: ""
//   });

//   // Quando receber dados de edição do pai, preenche o form
//   useEffect(() => {
//     if (alunoEditando) {
//       setFormData(alunoEditando);
//     } else {
//       resetForm();
//     }
//   }, [alunoEditando]);

//   const resetForm = () => {
//     setFormData({
//       nome: "",
//       data_nascimento: "",
//       email: "",
//       telefone: "",
//       casa_numero: "",
//       bairro: "",
//       municipio: "",
//       distrito: "",
//       provincia: "",
//       responsavel_id: ""
//     });
//   };

//   const salvarAluno = async (e) => {
//     e.preventDefault();
//     let error;

//     if (alunoEditando) {
//       // Atualizar
//       ({ error } = await supabase
//         .from("alunos")
//         .update(formData)
//         .eq("id", alunoEditando.id));
//     } else {
//       // Criar
//       ({ error } = await supabase.from("alunos").insert([formData]));
//     }

//     if (error) {
//       console.error("Erro ao salvar aluno:", error);
//     } else {
//       onSalvo();
//       const modal = bootstrap.Modal.getInstance(document.getElementById("modalAluno"));
//       modal.hide();
//       resetForm();
//     }
//   };

//   return (
//     <div
//       className="modal fade"
//       id="modalAluno"
//       tabIndex="-1"
//       aria-labelledby="modalAlunoLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form onSubmit={salvarAluno}>
//             <div className="modal-header">
//               <h5 className="modal-title" id="modalAlunoLabel">
//                 {alunoEditando ? "Editar Aluno" : "Novo Aluno"}
//               </h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//             </div>

//             <div className="modal-body row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">Nome</label>
//                 <input
//                   className="form-control"
//                   value={formData.nome}
//                   onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Data de Nascimento</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={formData.data_nascimento}
//                   onChange={(e) =>
//                     setFormData({ ...formData, data_nascimento: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Telefone</label>
//                 <input
//                   className="form-control"
//                   value={formData.telefone}
//                   onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label">Casa Nº</label>
//                 <input
//                   className="form-control"
//                   value={formData.casa_numero}
//                   onChange={(e) =>
//                     setFormData({ ...formData, casa_numero: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label">Bairro</label>
//                 <input
//                   className="form-control"
//                   value={formData.bairro}
//                   onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label">Município</label>
//                 <input
//                   className="form-control"
//                   value={formData.municipio}
//                   onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label">Distrito</label>
//                 <input
//                   className="form-control"
//                   value={formData.distrito}
//                   onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Província</label>
//                 <input
//                   className="form-control"
//                   value={formData.provincia}
//                   onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
//                 />
//               </div>


//             </div>
//             <div className="modal-body row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">Nome do Responsável</label>
//                 <input
//                   className="form-control"
//                   value={formData.responsavel_nome}
//                   onChange={(e) =>
//                     setFormData({ ...formData, responsavel_nome: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">E-mail do Resp.</label>
//                 <input
//                   className="form-control"
//                   value={formData.responsavel_email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, responsavel_email: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Telefone do Resp.</label>
//                 <input
//                   className="form-control"
//                   value={formData.responsavel_telefone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, responsavel_telefone: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                 Cancelar
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 {alunoEditando ? "Atualizar" : "Salvar"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import supabase from "../../../supaBaseClient";

export default function ModalAluno({ alunoEditando, onSalvo }) {
  const [formData, setFormData] = useState({
    nome: "",
    data_nascimento: "",
    email: "",
    telefone: "",
    casa_numero: "",
    bairro: "",
    municipio: "",
    distrito: "",
    provincia: "",
    responsavel_id: ""
  });

  const [usarResponsavelExistente, setUsarResponsavelExistente] = useState(false);
  const [responsaveis, setResponsaveis] = useState([]);
  const [responsavelSelecionado, setResponsavelSelecionado] = useState("");
  const [novoResponsavel, setNovoResponsavel] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    if (usarResponsavelExistente) {
      fetchResponsaveis();
    }
  }, [usarResponsavelExistente]);

  const fetchResponsaveis = async () => {
    const { data, error } = await supabase.from("responsaveis").select("*");
    if (!error) setResponsaveis(data);
  };

  useEffect(() => {
    if (alunoEditando) {
      setFormData(alunoEditando);
      if (alunoEditando.responsavel_id) {
        setUsarResponsavelExistente(true);
        setResponsavelSelecionado(alunoEditando.responsavel_id);
      }
    } else {
      resetForm();
    }
  }, [alunoEditando]);

  const resetForm = () => {
    setFormData({
      nome: "",
      data_nascimento: "",
      email: "",
      telefone: "",
      casa_numero: "",
      bairro: "",
      municipio: "",
      distrito: "",
      provincia: "",
      responsavel_id: ""
    });
    setNovoResponsavel({ nome: "", email: "", telefone: "" });
    setResponsavelSelecionado("");
    setUsarResponsavelExistente(false);
  };

  const salvarAluno = async (e) => {
    e.preventDefault();
    let responsavelId = responsavelSelecionado;

    if (!usarResponsavelExistente) {
      // Criar responsável novo
      const { data: respData, error: respError } = await supabase
        .from("responsaveis")
        .insert([novoResponsavel])
        .select("id")
        .single();
      if (respError) {
        console.error("Erro ao criar responsável:", respError);
        return;
      }
      responsavelId = respData.id;
    }

    const alunoPayload = { ...formData, responsavel_id: responsavelId };

    let error;
    if (alunoEditando) {
      ({ error } = await supabase
        .from("alunos")
        .update(alunoPayload)
        .eq("id", alunoEditando.id));
    } else {
      ({ error } = await supabase.from("alunos").insert([alunoPayload]));
    }

    if (error) {
      console.error("Erro ao salvar aluno:", error);
    } else {
      onSalvo();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAluno")
      );
      modal.hide();
      resetForm();
    }
  };

  return (
    <div className="modal fade" id="modalAluno" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={salvarAluno}>
            <div className="modal-header">
              <h5 className="modal-title">
                {alunoEditando ? "Editar Aluno" : "Novo Aluno"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body row g-3">
              {/* Campos do aluno */}
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.data_nascimento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      data_nascimento: e.target.value
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                />
              </div>

              {/* Endereço */}
              <div className="col-md-3">
                <label className="form-label">Casa Nº</label>
                <input
                  className="form-control"
                  value={formData.casa_numero}
                  onChange={(e) =>
                    setFormData({ ...formData, casa_numero: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Bairro</label>
                <input
                  className="form-control"
                  value={formData.bairro}
                  onChange={(e) =>
                    setFormData({ ...formData, bairro: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Município</label>
                <input
                  className="form-control"
                  value={formData.municipio}
                  onChange={(e) =>
                    setFormData({ ...formData, municipio: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Distrito</label>
                <input
                  className="form-control"
                  value={formData.distrito}
                  onChange={(e) =>
                    setFormData({ ...formData, distrito: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Província</label>
                <input
                  className="form-control"
                  value={formData.provincia}
                  onChange={(e) =>
                    setFormData({ ...formData, provincia: e.target.value })
                  }
                />
              </div>

              {/* Seletor de responsável */}
              <div className="col-12">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={usarResponsavelExistente}
                    onChange={(e) =>
                      setUsarResponsavelExistente(e.target.checked)
                    }
                  />
                  <label className="form-check-label">
                    Usar responsável já cadastrado
                  </label>
                </div>
              </div>

              {usarResponsavelExistente ? (
                <div className="col-md-12">
                  <label className="form-label">Selecione o responsável</label>
                  <select
                    className="form-select"
                    value={responsavelSelecionado}
                    onChange={(e) => setResponsavelSelecionado(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {responsaveis.map((resp) => (
                      <option key={resp.id} value={resp.id}>
                        {resp.nome} - {resp.telefone}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Nome do Responsável</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.nome}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          nome: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">E-mail do Resp.</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.email}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          email: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telefone do Resp.</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.telefone}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          telefone: e.target.value
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {alunoEditando ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
