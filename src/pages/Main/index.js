import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, List, Repository } from './styles';
import Container from '../../components/Container';
import moment from 'moment';

import api from '../../services/api';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repositoryError: false
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.newRepo}`
      );
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...this.state.repositories, repository],
        newRepo: '',
        repositoryError: false
      });
    } catch (err) {
      this.setState({ repositoryError: true });
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = x => {
    const { repositories } = this.state;
    console.log(x);
    this.setState({
      repositories: repositories.filter(repo => repo !== x)
    });
  };

  render() {
    const { newRepo, repositories, repositoryError, loading } = this.state;

    return (
      <>
        <Container>
          <h1>
            <FaGithubAlt />
            Repository
          </h1>

          <Form withError={repositoryError} onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="User/repository"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? <FaSpinner color="#FFF" size={14} /> : 'OK'}
            </SubmitButton>
          </Form>
        </Container>
        <List>
          {repositories.map(repository => (
            <Repository key={repository.id}>
              <header>
                <img src={repository.owner.avatar_url} alt="" />
                <strong>{repository.name}</strong>
                <small>{repository.owner.login}</small>
              </header>
              <ul>
                <li>
                  {repository.stargazers_count} <small>stars</small>
                </li>
                <li>
                  {repository.forks_count} <small>forks</small>
                </li>
                <li>
                  {repository.open_issues_count} <small>issues</small>
                </li>
                <li>
                  {repository.lastCommit} <small>Last commit</small>
                </li>
                <li>
                  <Link
                    to={`/repository/${encodeURIComponent(
                      repository.full_name
                    )}`}
                  >
                    Details
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => this.handleDelete(repository)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </Repository>
          ))}
        </List>
        <footer>&copy;Pedro Leinar</footer>
      </>
    );
  }
}

export default Main;
