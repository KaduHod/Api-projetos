import { Document, ObjectId } from 'mongodb';
import ProjectInterface from '../interfaces/ProjectInterface';
import { getDb } from '../database/init';

export default class ProjectRepository {
    public client:any;
    public collection:any;

    constructor(){
        this.collection = getDb({database:'api-projects', collection:"projects"});
    }

    public insertMyProjects = async ():Promise<void> => {
        const projects:ProjectInterface[] = [
            {
                _id : new ObjectId(),
                name : 'Sync youtube',
                description : 'Com este site você consegue assistir vídeos no youtube com outra pessoa em sincronia. Esta em fase de testes mas ja é possivel compartilhar o seu vídeo com outra pessoa que tambem está com o site aberto.\n O site utiliza web-socket para atualizar os clientes sobre os vídeos compartilhados.',
                link : 'https://watch-sync-videos.vercel.app/',
                repositorie : ['https://github.com/KaduHod/watch-sync-videos/tree/client-branch','https://github.com/KaduHod/watch-sync-videos/tree/server-branch'],
                technologies : [
                    {name: 'Node', type : 'programming language'},
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Web-socket', type : 'Web protocol'},
                    {name: 'Express.js', type : 'Node framework'},
                    {name: 'Vercel', type:'server'},
                    {name: 'Heroku', type:'server'}
                ]
            },
            {
                _id : new ObjectId(),
                name : 'Baixar aúdios de vídeos no youtube',
                description : 'Quem nunca quis baixar musicas direto do youtube? Este projeto tem esse intuito. Tudo começou quando um amigo pediu para eu baixar uma playlist de rap para ele, ja que eu mexia com computador. Bom, acabei criando um programa para isso. Gostei muito do resultado pois isso tornou todo o processo de baixar o audio do youtube e extrair o audio extremamente rapido e prático',
                link : 'https://baixaraudioyoutube.herokuapp.com/',
                repositorie : 'https://github.com/KaduHod/BaixarAudio',
                technologies : [
                    {name: 'Node', type : 'programming language'},
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Heroku', type:'server'}
                ]
            },
            {
                _id : new ObjectId(),
                name : 'EDF tools',
                description : 'Meu primeiro projeto publicado na web. Nele você pode fazer calculos de densidade e gordura corporal. Fiz ele utilizando como base o conteudo do curso de educação fisica que fiz antes de entrar na área de TI.',
                link : 'https://edftools.vercel.app/',
                repositorie : 'https://github.com/KaduHod/EDF-TOOLS',
                technologies : [
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Vercel', type:'server'}
                ]
            },
            {
                _id : new ObjectId(),
                name : 'Tactical web site',
                description : 'Site feito a pedido de um amigo, que na época, estava com planos de abrir uma empresa de vigilância. Como forma de insentivo, me disponibilizei a criar uma pagina estática como ao projeto. A empresa acabou nao indo para frente, mas, o site foi feito e ainda esta no ar.',
                link : 'https://tactical-front-end.vercel.app/',
                repositorie : 'https://github.com/KaduHod/tacticalFrontEnd',
                technologies : [
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Vercel', type:'server'}
                ]
            },
            {
                _id : new ObjectId(),
                name : 'Brisamar - concessionária autorizada candeias',
                description : 'Construí este site para o meu sogro, que possui uma concessionario do candeias. Nele está disponível para os clientes todos os meios de contato com a concessíonaria, link direto para converso no whatts, localização e lista de hoteis disponiveis para a tão sonhada viagem de férias. Além disso construí uma api que recebe os dados do cliente pra cadastro no portal de registro de socios do candeias e um endpoint que faz um upload de todos os clientes que se inscreveram pelo site.',
                link : 'https://candeias.vercel.app/',
                repositorie : ['https://github.com/KaduHod/Brisamar','https://github.com/KaduHod/API'],
                technologies : [
                    {name: 'Node', type : 'programming language'},
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Express.js', type : 'Node framework'},
                    {name: 'Vercel', type:'server'},
                    {name: 'Heroku', type:'server'},

                ]
            },
            {
                _id : new ObjectId(),
                name : 'Gerador de planilhas de treinos',
                description : 'Projeto com intuito de criar planilhas de treinos para personais treiner. Se trata de uma pagina estatica com um formulario onde você pode cadastrar os dados do aluno e criar uma periodização (lista de treinos para um periodo) e receber tudo isso em um arquivo excel formaado pronto para ser entregue ao seu aluno. A planilha gerada com python, consegue calcular o volume do treino e ainda tem link de videos direto para o youtube sobre o exercicio registrado na planilha.',
                link : 'https://planilhas.herokuapp.com/',
                repositorie : 'https://github.com/KaduHod/workout-sheets',
                technologies : [
                    {name: 'Python', type : 'programming language'},
                    {name: 'Flask', type : 'Python framework'},
                    {name: 'Javascript', type : 'programming language'},
                    {name: 'html', type : 'hypertext language marcation'},
                    {name: 'Css', type : 'Sheet style language'},
                    {name: 'Heroku', type:'server'},

                ]
            },
            
            
        ]
        this.collection.insertMany(projects)
        this.client.closeConnection();
    }

    public all = async ():Promise<Document | any>  => {
        try {
            const cursor = this.collection.find();
            return cursor.toArray();
        } catch (error) {
            return error
        }
    }
    public getProject = async (projectId:ObjectId):Promise<Document | any> =>
    {
        try {
            const data = await this.collection.findOne({_id:projectId});
            return data;
        } catch (error) {
            console.log(error)
            return error;
        }
        
    }
}