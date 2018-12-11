pragma solidity ^0.4.24;

contract Sample{

    string public Name;

    event LogNameSaved(string name);

    function setName(
        string _name
    )
        external
        returns (bool)
    {
        Name = _name;
        emit LogNameSaved(_name);
        return true;
    }
}