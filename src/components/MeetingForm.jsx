import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import styled from 'styled-components';

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  participantsList: {
    marginBottom: 10,
  },

  participant: {
    fontSize: 12,
    marginBottom: 4,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
  },
  table: {
    width: '100%',
    marginBottom: 10,
    border: '1px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    padding: 5,
    border: '1px solid #000',
  },
  tableCell: {
    fontSize: 12,
  },
  observation: {
    marginTop: 20,
    fontSize: 12,
    border: '1px solid #000',
    padding: 5,
  },
  topRightSection: {
    position: 'absolute',
    top: 30,
    right: 30,
    textAlign: 'right',
  },
  box: {
    border: '1px solid #000',
    padding: 5,
    marginBottom: 10,
  }
});

// Estilos para o Formulário
const FormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    border: 2px;
  }

  label {
    font-weight: bold;
    margin-top: 10px;
  }

  input, textarea {
    margin-top: 5px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none; /* Impede o redimensionamento das textareas */
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #065ac7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
`;

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    participantes: [],
    localizacao: '',
    dataHora: '',
    assunto: '',
    assunto1: '',
    conclusao1: '',
    assunto2: '',
    conclusao2: '',
    assunto3: '',
    conclusao3: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // Se for checkbox, atualize o array de participantes
      if (checked) {
        setFormData({
          ...formData,
          participantes: [...formData.participantes, value]
        });
      } else {
        setFormData({
          ...formData,
          participantes: formData.participantes.filter((participant) => participant !== value)
        });
      }
    } else {
      // Caso contrário, atualize o estado normalmente
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

// Função para validar se os campos obrigatórios estão preenchidos
const validateForm = () => {
  const {
    localizacao,
    dataHora,
    assunto,
    assunto1,
    conclusao1
  } = formData;

  if (
    localizacao.trim() === '' ||
    dataHora.trim() === '' ||
    assunto.trim() === '' ||
    assunto1.trim() === '' ||
    conclusao1.trim() === ''
  ) {
    // Exibe um alerta se algum campo obrigatório não estiver preenchido
    alert('Por favor, preencha todos os campos obrigatórios.');

    // Adiciona borda vermelha aos campos não preenchidos
    const fields = document.querySelectorAll('input[name="localizacao"], input[name="dataHora"], input[name="assunto"], input[name="assunto1"], textarea[name="conclusao1"]');
    fields.forEach(field => {
      if (field.value.trim() === '') {
        field.style.border = '2px solid red';
      } else {
        field.style.border = '1px solid #ccc'; // Resetar a borda se o campo estiver preenchido
      }
    });

    return false;
  }

  return true;
};



  


  // Documento PDF
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Relatório IITECH</Text>

        <View style={styles.topRightSection}>
          <Text style={styles.text}>{new Date(formData.dataHora).toLocaleString()}</Text>
          <Text style={styles.text}>Local: {formData.localizacao}</Text>
        </View>

        <View style={styles.section}>
  <Text style={styles.label}>Participantes:</Text>
  <View style={styles.participantsList}>
    {formData.participantes.map((participant, index) => (
      <Text key={index} style={styles.participant}>{participant}</Text>
    ))}
  </View>
</View>

        <View style={styles.section}>
          <Text style={styles.label}>Assunto Principal: <Text style={styles.text}>{formData.assunto}</Text></Text>
        </View>

        <Text style={styles.label}>Assunto 1:</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{formData.assunto1}</Text>
          <Text style={styles.label}>Principais Conclusões ou Decisões:</Text>
          <Text style={styles.text}>{formData.conclusao1}</Text>
        </View>

        <Text style={styles.label}>Assunto 2:</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{formData.assunto2}</Text>
          <Text style={styles.label}>Principais Conclusões ou Decisões:</Text>
          <Text style={styles.text}>{formData.conclusao2}</Text>
        </View>

        <Text style={styles.label}>Assunto 3:</Text>
        <View style={styles.box}>
          <Text style={styles.text}>{formData.assunto3}</Text>
          <Text style={styles.label}>Principais Conclusões ou Decisões:</Text>
          <Text style={styles.text}>{formData.conclusao3}</Text>
        </View>

        <Text style={styles.label}>Observações:</Text>
        <View style={styles.observation}>
          <Text style={styles.text}>{formData.observacoes}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <FormContainer>
      <h1>Relatório</h1>
      <form>
        <label>Participantes:</label>
        <div>
          <label>
            <input type="checkbox" name="participantes" value="O Conselho" onChange={handleChange} />
            O Conselho
          </label><br />
          <label>
            <input type="checkbox" name="participantes" value="Departamento de Redes" onChange={handleChange} />
            Departamento de Redes
          </label><br />
          <label>
            <input type="checkbox" name="participantes" value="Departamento de Design" onChange={handleChange} />
            Departamento de Design
          </label><br />
          <label>
            <input type="checkbox" name="participantes" value="Departamento de Programação" onChange={handleChange} />
            Departamento de Programação
          </label><br />
          <label>
            <input type="checkbox" name="participantes" value="Departamento de Hardware" onChange={handleChange} />
            Departamento de Hardware
          </label><br />
          <label>
            <input type="checkbox" name="participantes" value="Departamento de Mentoria" onChange={handleChange} />
            Departamento de Mentoria
          </label>
        </div>
        <label>Localização:</label>
        <input type="text" name="localizacao" onChange={handleChange} required/>
        <label>Data e Hora:</label>
        <input type="datetime-local" name="dataHora" onChange={handleChange} required/>
        <label>Assunto Principal:</label>
        <input name="assunto" onChange={handleChange} required/>
        <h2>Assunto 1</h2>
        <label>Escreva aqui o assunto 1 desta reunião:</label>
        <input type="text" name="assunto1" onChange={handleChange} required/>
        <label>Principais Conclusões ou Decisões:</label>
        <textarea name="conclusao1" onChange={handleChange} required></textarea>
        <h2>Assunto 2</h2>
        <label>Escreva aqui o assunto 2 desta reunião:</label>
        <input name="assunto2" onChange={handleChange}/>
        <label>Principais Conclusões ou Decisões:</label>
        <textarea name="conclusao2" onChange={handleChange}></textarea>
        <h2>Assunto 3</h2>
        <label>Escreva aqui o assunto 3 desta reunião:</label>
        <input name="assunto3" onChange={handleChange}/>
        <label>Principais Conclusões ou Decisões:</label>
        <textarea name="conclusao3" onChange={handleChange}></textarea>
        <label>Observações:</label>
        <textarea name="observacoes" onChange={handleChange}></textarea>
      </form>
      <PDFDownloadLink
      document={MyDocument}
      fileName="ata_de_reuniao.pdf"
      onClick={(e) => {
        if (!validateForm()) {
          e.preventDefault();
        }
      }}
    >
      {({ loading }) => (
        <button>
          {loading ? 'Gerando PDF...' : 'Baixar PDF'}
        </button>
      )}
    </PDFDownloadLink>
    </FormContainer>
  );
};

export default MeetingForm;

