from helper.vector_store_helper import init_vector_store

if __name__ == '__main__':
    vector_store = init_vector_store()
    vector_store.similarity_search(input("query"), k=2)
